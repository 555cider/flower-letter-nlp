from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# AI 관련
import torch
from kobert.pytorch_kobert import get_pytorch_kobert_model
from app.classify_keywords import predict as predict_keywords
from app.classify_emotion import predict as predict_emotion
from app.keyword_predict import predict as predict_k, BERTClassifier as BERTClassifier_k
from app.emotion_predict import predict as predict_e, BERTClassifier as BERTClassifier_e


class Letter(BaseModel):
    text: str


class Keywords(BaseModel):
    keywords: List[str]


app = FastAPI(title="API service for model")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "모델 API 입니다!"}


device = torch.device("cpu")

# 키워드
model_k, vocab_k = get_pytorch_kobert_model(cachedir=".cache")
saved_model_k = BERTClassifier_k(model_k, dr_rate=0.5).to(device)

# 감정
model_e, vocab_e = get_pytorch_kobert_model(cachedir=".cache")
saved_model_e = BERTClassifier_e(model_e, dr_rate=0.5).to(device)


@app.post("/classify", response_model=Keywords)
def classify_letter(data: Letter):
    print(data.text)
    predict_k(saved_model_k, vocab_k, data.text)
    emotion = predict_e(saved_model_e, vocab_e, data.text)
    return {"keywords": [emotion]}
