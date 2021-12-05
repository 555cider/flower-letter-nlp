from fastapi import FastAPI, Depends
from app.api import main_router

from app.db import init_mongo


def create_application() -> FastAPI:
    application = FastAPI()
    application.include_router(main_router)

    return application


app = create_application()


@app.on_event("startup")
async def app_init():
    """Initialize application services"""
    await init_mongo()


@app.get("/ping")
async def say_hi():
    return {"hello": "world!"}
