import torch
from torch import nn
import joblib
from bert_set import BERTClassifier, BERTDataset

# 클래스 인자
max_len = 15  # 해당 길이를 초과하는 단어에 대해선 bert가 학습하지 않음
batch_size = 64
warmup_ratio = 0.1
num_epochs = 5
max_grad_norm = 1
log_interval = 200
learning_rate = 5e-5


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

model = joblib.load('../models/kobert_letter_single.pkl')

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
