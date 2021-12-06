# 라이브러리 임포트
import torch
from torch import nn
import torch.nn.functional as F
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import gluonnlp as nlp
import numpy as np
from tqdm import tqdm, tqdm_notebook
from kobert.utils import get_tokenizer
from kobert.pytorch_kobert import get_pytorch_kobert_model
from transformers import AdamW
from transformers.optimization import get_cosine_schedule_with_warmup

# 데이터셋 불러오기
dataset_train = nlp.data.TSVDataset(
    "/content/drive/MyDrive/Colab Notebooks/nlp3/data/letter_class.tsv",
    field_indices=[1, 2],
    num_discard_samples=1,
)
dataset_test = nlp.data.TSVDataset(
    "/content/drive/MyDrive/Colab Notebooks/nlp3/data/letter_class.tsv",
    field_indices=[1, 2],
    num_discard_samples=1,
)

#
bertmodel, vocab = get_pytorch_kobert_model()

# 토큰화
tokenizer = get_tokenizer()
tok = nlp.data.BERTSPTokenizer(tokenizer, vocab, lower=False)

# 클래스: 데이터셋 → Tensor데이터셋
class BERTDataset(Dataset):
    def __init__(
        self, dataset, sent_idx, label_idx, bert_tokenizer, max_len, pad, pair
    ):
        transform = nlp.data.BERTSentenceTransform(
            bert_tokenizer, max_seq_length=max_len, pad=pad, pair=pair
        )

        self.sentences = [transform([i[sent_idx]]) for i in dataset]
        self.labels = [np.int32(i[label_idx]) for i in dataset]

    def __getitem__(self, i):
        return self.sentences[i] + (self.labels[i],)

    def __len__(self):
        return len(self.labels)


# 클래스 인자
max_len = 15  # 해당 길이를 초과하는 단어에 대해선 bert가 학습하지 않음
batch_size = 64
warmup_ratio = 0.1
num_epochs = 5
max_grad_norm = 1
log_interval = 200
learning_rate = 5e-5

# 데이터셋→BERT데이터셋
data_train = BERTDataset(dataset_train, 1, 0, tok, max_len, True, False)
data_test = BERTDataset(dataset_test, 1, 0, tok, max_len, True, False)

# 배치 및 데이터로더 설정
train_dataloader = torch.utils.data.DataLoader(
    data_train, batch_size=batch_size, num_workers=4
)
test_dataloader = torch.utils.data.DataLoader(
    data_test, batch_size=batch_size, num_workers=4
)


class BERTClassifier(nn.Module):
    def __init__(
        self, bert, hidden_size=768, num_classes=26, dr_rate=None, params=None
    ):
        super(BERTClassifier, self).__init__()
        self.bert = bert
        self.dr_rate = dr_rate
        self.classifier = nn.Linear(hidden_size, num_classes)
        if dr_rate:
            self.dropout = nn.Dropout(p=dr_rate)

    def gen_attention_mask(self, token_ids, valid_length):
        attention_mask = torch.zeros_like(token_ids)
        for i, v in enumerate(valid_length):
            attention_mask[i][:v] = 1
        return attention_mask.float()

    def forward(self, token_ids, valid_length, segment_ids):
        attention_mask = self.gen_attention_mask(token_ids, valid_length)
        _, pooler = self.bert(
            input_ids=token_ids,
            token_type_ids=segment_ids.long(),
            attention_mask=attention_mask.float().to(token_ids.device),
        )
        if self.dr_rate:
            out = self.dropout(pooler)
        return self.classifier(out)


# BERT 모델 불러오기
model = BERTClassifier(bertmodel, dr_rate=0.5)

# Prepare optimizer and schedule (linear warmup and decay)
no_decay = ["bias", "LayerNorm.weight"]
optimizer_grouped_parameters = [
    {
        "params": [
            p
            for n, p in model.named_parameters()
            if not any(nd in n for nd in no_decay)
        ],
        "weight_decay": 0.01,
    },
    {
        "params": [
            p for n, p in model.named_parameters() if any(nd in n for nd in no_decay)
        ],
        "weight_decay": 0.0,
    },
]

optimizer = AdamW(optimizer_grouped_parameters, lr=learning_rate)
loss_fn = nn.CrossEntropyLoss()

t_total = len(dataset_train) * num_epochs
warmup_step = int(t_total * warmup_ratio)

scheduler = get_cosine_schedule_with_warmup(
    optimizer, num_warmup_steps=warmup_step, num_training_steps=t_total
)

# 정확도 측정을 위한 함수 정의
def calc_accuracy(X, Y):
    max_vals, max_indices = torch.max(X, 1)
    train_acc = (max_indices == Y).sum().data.cpu().numpy() / max_indices.size()[0]
    return train_acc


for e in range(num_epochs):
    train_acc = 0.0
    test_acc = 0.0
    model.train()
    for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(
        tqdm_notebook(train_dataloader)
    ):
        optimizer.zero_grad()
        token_ids = token_ids.long()
        segment_ids = segment_ids.long()
        valid_length = valid_length
        label = label.long()
        out = model(token_ids, valid_length, segment_ids)
        loss = loss_fn(out, label)
        loss.backward()
        torch.nn.utils.clip_grad_norm_(model.parameters(), max_grad_norm)
        optimizer.step()
        scheduler.step()  # Update learning rate schedule
        train_acc += calc_accuracy(out, label)
        if batch_id % log_interval == 0:
            print(
                "epoch {} batch id {} loss {} train acc {}".format(
                    e + 1,
                    batch_id + 1,
                    loss.data.cpu().numpy(),
                    train_acc / (batch_id + 1),
                )
            )
    print("epoch {} train acc {}".format(e + 1, train_acc / (batch_id + 1)))

    model.eval()
    for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(
        tqdm_notebook(test_dataloader)
    ):
        token_ids = token_ids.long()
        segment_ids = segment_ids.long()
        valid_length = valid_length
        label = label.long()
        out = model(token_ids, valid_length, segment_ids)
        test_acc += calc_accuracy(out, label)
    print("epoch {} test acc {}".format(e + 1, test_acc / (batch_id + 1)))

MODEL_NAME = "kobert_letter_single"
MODEL_SAVE_PATH = "/content/drive/MyDrive/Colab Notebooks/nlp3/model/" + MODEL_NAME

torch.save(model, MODEL_SAVE_PATH)
