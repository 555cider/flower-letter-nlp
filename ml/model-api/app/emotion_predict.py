import torch
from torch import nn
from torch.utils.data import Dataset, DataLoader
import gluonnlp as nlp
import numpy as np
from kobert.utils import get_tokenizer

# 클래스 인자
MAX_LEN = 128
BATCH_SIZE = 32
warmup_ratio = 0.1
num_epochs = 5
max_grad_norm = 1
log_interval = 200
learning_rate = 5e-5

device = torch.device("cpu")


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


class BERTClassifier(nn.Module):
    def __init__(self, bert, hidden_size=768, num_classes=6, dr_rate=None, params=None):
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


# 정확도 측정을 위한 함수 정의
def calc_accuracy(X, Y):
    max_vals, max_indices = torch.max(X, 1)
    train_acc = (max_indices == Y).sum().data.cpu().numpy() / max_indices.size()[0]
    return train_acc


def predict(model, vocab, predict_sentence):
    data = [predict_sentence, "0"]
    dataset_another = [data]

    model.load_state_dict(torch.load("model_e", map_location=device))

    tokenizer = get_tokenizer()
    tok = nlp.data.BERTSPTokenizer(tokenizer, vocab, lower=False)

    another_test = BERTDataset(dataset_another, 0, 1, tok, 128, True, False)
    test_dataloader = DataLoader(another_test, batch_size=32, num_workers=4)

    model.eval()
    for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(
        test_dataloader
    ):
        token_ids = token_ids.long().to(device)
        segment_ids = segment_ids.long().to(device)
        valid_length = valid_length
        label = label.long().to(device)
        out = model(token_ids, valid_length, segment_ids)
        origin_label = ["희망", "사랑", "분노", "슬픔", "공포", "생각"]
        test_eval = []
        for i in out:
            logits = i
            logits = logits.detach().cpu().numpy()
            test_eval.append(np.argmax(logits))
        return origin_label[test_eval[0]]
