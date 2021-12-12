from typing import List, Dict
from fastapi import FastAPI
from pydantic import BaseModel
import torch
from kobert.pytorch_kobert import get_pytorch_kobert_model

from app.emotion_predict import predict as predict_e, BERTClassifier as BERTClassifier_e
from app.keyword_predict import predict as predict_k, BERTClassifier as BERTClassifier_k


class Letter(BaseModel):
    text: str


class Emotions(BaseModel):
    high: List[str] = []
    medium: List[str] = []
    low: List[str] = []


class ModelResults(BaseModel):
    emotions: Emotions
    keywords: List[str]


app = FastAPI(title="API service for model")


@app.get("/")
def read_root():
    return {"message": "모델 API 입니다!"}


device = torch.device("cpu")
model, vocab = get_pytorch_kobert_model(cachedir=".cache")
model_e = BERTClassifier_e(model, dr_rate=0.5).to(device)
model_k = BERTClassifier_k(model, dr_rate=0.5).to(device)


@app.post("/classify")
def classify_letter(data: Letter):
    print(data.text)
    emotion = predict_e(model_e, vocab, data.text)
    keyword = predict_k(model_k, vocab, data.text)

    # TODO: 이부분 지우기
    keyword_list = keyword["high"] + keyword["mid"] + keyword["low"]

    result = ModelResults(emotions=emotion, keywords=keyword_list)

    return result
