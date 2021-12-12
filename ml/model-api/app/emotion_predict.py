import torch
from torch import nn
from torch.utils.data import Dataset, DataLoader
import gluonnlp as nlp
import numpy as np
from kobert.utils import get_tokenizer

NUM_CLASSES = 6  # 클래스 수
SENT_IDX = 0  # 문장 컬럼
LABEL_IDX = 1  # 레이블 컬럼
MAX_LEN = 128  # 이 크기를 넘는 문장은 스킵
BATCH_SIZE = 32
NUM_WORKERS = 4  # 현재 5 이상은 불가

device = torch.device("cpu")


class BERTDataset(Dataset):
    def __init__(self, dataset, sent_idx, label_idx, bert_tokenizer, max_len):
        transform = nlp.data.BERTSentenceTransform(
            bert_tokenizer, max_seq_length=max_len, pad=True, pair=False
        )
        self.sentences = [transform([i[sent_idx]]) for i in dataset]
        self.labels = [np.int32(i[label_idx]) for i in dataset]

    def __getitem__(self, i):
        return self.sentences[i] + (self.labels[i],)

    def __len__(self):
        return len(self.labels)


class BERTClassifier(nn.Module):
    def __init__(
        self, bert, hidden_size=768, num_classes=NUM_CLASSES, dr_rate=None, params=None
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
            return_dict=False,
        )
        if self.dr_rate:
            out = self.dropout(pooler)
        return self.classifier(out)


def predict(model, vocab, predict_sentence):
    data = [predict_sentence, "0"]
    dataset_another = [data]

    model.load_state_dict(torch.load("model_e", map_location=device))

    tokenizer = get_tokenizer()
    tok = nlp.data.BERTSPTokenizer(tokenizer, vocab, lower=False)

    another_test = BERTDataset(dataset_another, SENT_IDX, LABEL_IDX, tok, MAX_LEN)
    test_dataloader = DataLoader(
        another_test, batch_size=BATCH_SIZE, num_workers=NUM_WORKERS
    )

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
    high = []
    mid = []
    low = []

    for i in out:
        logits = i
        logits = logits.detach().cpu().numpy()
        logits = logits.tolist()
        desc_sorted = sorted(logits, reverse=True)
        for j in range(len(desc_sorted)):
            if desc_sorted[j] >= 0.5:
                high.append(origin_label[logits.index(desc_sorted[j])])
            elif desc_sorted[j] >= 0.3:
                mid.append(origin_label[logits.index(desc_sorted[j])])
            elif desc_sorted[j] >= 0.1:
                low.append(origin_label[logits.index(desc_sorted[j])])
            else:
                break
    return {"high": high, "medium": mid, "low": low}
