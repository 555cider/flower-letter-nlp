from fastapi import FastAPI

app = FastAPI(title="API service for model")


@app.get("/")
def read_root():
    return {"message": "모델 API 입니다!"}


@app.get("/keywords")
def read_root():
    return {"ping": "test!"}
