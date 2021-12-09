from typing import List
from fastapi import FastAPI
from pydantic import BaseModel

from app.classify_emotion import predict as predict_emotion
from app.classify_keywords import predict as predict_keywords

# test
from app.keyword_predict import predict as keyword_predict_test


class Letter(BaseModel):
    text: str


class Keywords(BaseModel):
    keywords: List[str]


app = FastAPI(title="API service for model")


@app.get("/")
def read_root():
    return {"message": "모델 API 입니다!"}






#app 실행할때 처음 생성하는 모델
import torch
from kobert.pytorch_kobert import get_pytorch_kobert_model
from app.keyword_predict import BERTClassifier

bertmodel, vocab = get_pytorch_kobert_model(cachedir=".cache")

device = torch.device("cpu")
saved_model = BERTClassifier(bertmodel,  dr_rate=0.5).to(device)

@app.post("/classify", response_model=Keywords)
def classify_letter(data: Letter):
    # 모델로 키워드 추출 후 반환

    print(data.text)
    keyword_predict_test(saved_model, vocab, data.text)

    return ["우정, 사랑, 여행", "낭만@", "도시", "일탈"]
