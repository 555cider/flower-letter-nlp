import torch
from torch import nn
from torch.utils.data import Dataset, DataLoader
import gluonnlp as nlp
from kobert.utils import get_tokenizer

MAX_LEN = 128
TRAIN_BATCH_SIZE = 1

device = torch.device("cpu")


class BERTClassifier(nn.Module):
    def __init__(
        self, bert, hidden_size=768, num_classes=17, dr_rate=None, params=None
    ):
        super(BERTClassifier, self).__init__()
        self.bert = bert
        self.dr_rate = dr_rate

        self.classifier = nn.Linear(hidden_size, num_classes)

        if dr_rate:
            self.dropout = nn.Dropout(p=dr_rate)

    def forward(self, token_ids, attention_mask, segment_ids):
        _, pooler = self.bert(
            input_ids=token_ids,
            token_type_ids=segment_ids.long(),
            attention_mask=attention_mask.float().to(token_ids.device),
        )

        if self.dr_rate:
            out = self.dropout(pooler)
        return self.classifier(out)


class BERTDataset(Dataset):
    def __init__(self, df, tokenizer, max_len):
        self.df = df
        self.max_len = max_len
        self.tokenizer = tokenizer

        transform = nlp.data.BERTSentenceTransform(
            tokenizer, max_seq_length=max_len, pad=True, pair=False
        )
        self.sentences = [transform([i[0]]) for i in df]

    def __len__(self):
        return len(self.df)

    # 마스크 설정
    def gen_attention_mask(self, token_ids, valid_length):
        attention_mask = torch.zeros_like(token_ids)
        for i in range(valid_length):
            attention_mask[i] = 1
        return attention_mask.float()

    def __getitem__(self, i):
        ids = torch.tensor(self.sentences[i][0], dtype=torch.long)
        valid_length = int(self.sentences[i][1])
        attention_mask = self.gen_attention_mask(ids, valid_length)

        return {
            "ids": ids,
            "mask": attention_mask,
            "token_type_ids": torch.tensor(self.sentences[i][2], dtype=torch.long),
        }


def predict(saved_model, vocab, predict_sentence):
    data = [predict_sentence]

    # 모델 정보 이식
    saved_model.load_state_dict(torch.load("model_test_dict", map_location=device))

    tokenizer = get_tokenizer()
    tok = nlp.data.BERTSPTokenizer(tokenizer, vocab, lower=False)

    another_test = BERTDataset(data, tok, MAX_LEN)
    test_dataloader = DataLoader(
        another_test, batch_size=TRAIN_BATCH_SIZE, num_workers=4
    )

    saved_model.eval()
    for _, data in enumerate(test_dataloader, 0):
        ids = data["ids"].to(device, dtype=torch.long)
        token_type_ids = data["token_type_ids"].to(device, dtype=torch.long)
        mask = data["mask"].to(device, dtype=torch.long)

        outputs = saved_model(ids, mask, token_type_ids)

    cols = ["생각", "죽음", "자연", "가족", "시간", "신체", "집", "문학", "감각", "공간", "도시", "숫자"]
    high = []
    mid = []
    low = []

    for index, rate in enumerate(outputs.tolist()[0]):
        if rate >= 0.8:
            high.append(cols[index])
        elif rate >= 0.5:
            mid.append(cols[index])
        elif rate >= 0.3:
            low.append(cols[index])

    return {"high": high, "mid": mid, "low": low}
