from typing import List
from fastapi import FastAPI
import pickle
from pydantic import BaseModel


class Letter(BaseModel):
    text: str


class Keywords(BaseModel):
    keywords: List[str]


# import model
model = pickle.load(open("./model.pkl", "rb"))
print("loaded pickle!")

app = FastAPI(title="API service for model")


@app.get("/")
def read_root():
    return {"message": "모델 API 입니다!"}


@app.get("/classify", response_model=Keywords)
def classify_letter(data: Letter):
    # 모델로 키워드 추출 후 반환

    print(data.text)

    return ["우정, 사랑, 여행"]
