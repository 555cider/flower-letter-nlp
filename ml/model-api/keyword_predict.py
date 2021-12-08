# 라이브러리 임포트
import torch
from torch import nn
from torch.utils.data import Dataset, DataLoader
import gluonnlp as nlp
from kobert.utils import get_tokenizer
from kobert.pytorch_kobert import get_pytorch_kobert_model
from transformers import AutoConfig, AutoModel

bertmodel, vocab = get_pytorch_kobert_model(cachedir=".cache")

MAX_LEN = 128
TRAIN_BATCH_SIZE = 1

tokenizer = get_tokenizer()
tok = nlp.data.BERTSPTokenizer(tokenizer, vocab, lower=False)

device = torch.device("cuda")

class BERTClassifier(nn.Module):
    def __init__(self,
                 bert,
                 hidden_size = 768,
                 num_classes=17,
                 dr_rate=None,
                 params=None):
        super(BERTClassifier, self).__init__()
        self.bert = bert
        self.dr_rate = dr_rate
                 
        self.classifier = nn.Linear(hidden_size , num_classes)

        if dr_rate:
            self.dropout = nn.Dropout(p=dr_rate)

    def forward(self, token_ids, attention_mask, segment_ids):
        _, pooler = self.bert(input_ids = token_ids, token_type_ids = segment_ids.long(), attention_mask = attention_mask.float().to(token_ids.device))

        if self.dr_rate:
            out = self.dropout(pooler)
        return self.classifier(out)
    
class BERTDataset(Dataset):
    def __init__(self, df, tokenizer, max_len):
        self.df = df
        self.max_len = max_len
        self.tokenizer = tokenizer

        transform = nlp.data.BERTSentenceTransform(tokenizer, max_seq_length = max_len,
                                               pad=True, pair=False)
        self.sentences = [transform([i[0]]) for i in df]
        
    def __len__(self):
        return len(self.df)
        
    #마스크 설정
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
            'ids': ids,
            'mask': attention_mask,
            'token_type_ids' : torch.tensor(self.sentences[i][2], dtype=torch.long),
        }
    
def predict(predict_sentence):
    data = [predict_sentence]

    another_test = BERTDataset(data, tok, MAX_LEN)
    test_dataloader = DataLoader(another_test, batch_size=TRAIN_BATCH_SIZE, num_workers=4)

    model2.eval()
    for _, data in enumerate(test_dataloader, 0):
        ids = data['ids'].to(device, dtype = torch.long)
        token_type_ids = data['token_type_ids'].to(device, dtype = torch.long)
        mask = data['mask'].to(device, dtype = torch.long)
        
        outputs = model2(ids, mask, token_type_ids)
        
    print(outputs)


config = AutoConfig.from_pretrained('bert-base-uncased', return_dict=False)
model2 =  AutoModel.from_config(config)

model2.load_state_dict(torch.load('model.bin'), strict=False)
model2 = model2.cuda()

model2 = BERTClassifier(model2,  dr_rate=0.5).to(device)



predict("엄마 뭐해 사랑해 행복해 내일보자")