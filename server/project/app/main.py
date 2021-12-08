from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.api import main_router
from app.api.order import order_router

from app.db import init_mongo
from app.config import get_config

config = get_config()


def create_application() -> FastAPI:
    application = FastAPI(title="꽃편지 API", description="꽃편지 서비스의 API 목록입니다.")
    application.include_router(main_router)
    application.include_router(order_router)

    return application


app = create_application()

origins = config.allowed_origins.split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def app_init():
    """Initialize application services"""
    await init_mongo()


@app.get("/ping")
async def say_hi():
    return {"ping": "hello world!"}
