import torch
from torch import nn
from torch.utils.data import Dataset, DataLoader
import gluonnlp as nlp
import numpy as np
from tqdm import tqdm, tqdm_notebook
from transformers import AdamW
from transformers import BertModel, DistilBertModel
from transformers.optimization import get_cosine_schedule_with_warmup


bert_model = BertModel.from_pretrained("monologg/kobert")
distilbert_model = DistilBertModel.from_pretrained("monologg/distilkobert")
tokenizer = KoBertTokenizer.from_pretrained("monologg/kobert")

from tokenization_kobert import KoBertTokenizer
from pytorch_kobert import get_pytorch_kobert_model

x, vocab = get_pytorch_kobert_model()
tok = nlp.data.BERTSPTokenizer(tokenizer, vocab, lower=False)

# 데이터셋 불러오기
dataset_train = nlp.data.TSVDataset(
    "/content/drive/MyDrive/Colab Notebooks/nlp3/dataset/letter_single_train.tsv",
    field_indices=[0, 1],
    num_discard_samples=1,
)
dataset_test = nlp.data.TSVDataset(
    "/content/drive/MyDrive/Colab Notebooks/nlp3/dataset/letter_single_train.tsv",
    field_indices=[0, 1],
    num_discard_samples=1,
)

# 사랑(0), 좋다(1), 우정(2), 절망(3), 죽음(4), 차분(5), 행복(6), 슬픔(7), 조용(8), 사색(9), 동화(10), 감성(11), 일생(12), 기억(13), 가족(14), 밤(15), 자연(16), 동물(17), 계절(18), 신체(19), 물건(20), 색깔(21), 동네(22), 음식(23), 날씨(24), 여행(25)


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

tok = nlp.data.BERTSPTokenizer(tokenizer, vocab, lower=False)

# Tensor데이터셋
data_train = BERTDataset(dataset_train, 0, 1, tok, max_len, True, False)
data_test = BERTDataset(dataset_test, 0, 1, tok, max_len, True, False)

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
model = BERTClassifier(bert_model, dr_rate=0.5)

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


def predict(predict_sentence):

    data = [predict_sentence, "0"]
    dataset_another = [data]

    another_test = BERTDataset(dataset_another, 0, 1, tok, max_len, True, False)
    test_dataloader = torch.utils.data.DataLoader(
        another_test, batch_size=batch_size, num_workers=5
    )

    model.eval()
    for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(
        test_dataloader
    ):
        token_ids = token_ids.long()
        segment_ids = segment_ids.long()
        valid_length = valid_length
        label = label.long()
        out = model(token_ids, valid_length, segment_ids)
        origin_label = [
            "사랑",
            "좋다",
            "우정",
            "절망",
            "죽음",
            "차분",
            "행복",
            "슬픔",
            "조용",
            "사색",
            "동화",
            "감성",
            "일생",
            "기억",
            "가족",
            "밤",
            "자연",
            "동물",
            "계절",
            "신체",
            "물건",
            "색깔",
            "동네",
            "음식",
            "날씨",
            "여행",
        ]
        test_eval = []
        for i in out:
            logits = i
            logits = logits.detach().cpu().numpy()
            test_eval.append(np.argmax(logits))
        print(">> 입력하신 내용에서 " + origin_label[test_eval[0]] + " 느껴집니다.")


# 질문 무한반복하기! 0 입력시 종료
end = 1
while end == 1:
    sentence = input("하고싶은 말을 입력해주세요 : ")
    if sentence == "0":
        break
    predict(sentence)
    print("\n")
