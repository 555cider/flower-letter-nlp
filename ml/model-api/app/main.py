from typing import List
from fastapi import FastAPI
from pydantic import BaseModel

from app.classify_emotion import predict as predict_emotion
from app.classify_keywords import predict as predict_keywords


class Letter(BaseModel):
    text: str


class Keywords(BaseModel):
    keywords: List[str]


app = FastAPI(title="API service for model")


@app.get("/")
def read_root():
    return {"message": "모델 API 입니다!"}


@app.get("/classify", response_model=Keywords)
def classify_letter(data: Letter):
    # 모델로 키워드 추출 후 반환

    print(data.text)

    return ["우정, 사랑, 여행", "낭만", "도시", "일탈"]
