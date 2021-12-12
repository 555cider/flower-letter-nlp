from os import name
from beanie.odm.fields import PydanticObjectId
from fastapi import APIRouter, Depends, status, HTTPException, BackgroundTasks
from fastapi_mail import FastMail, MessageSchema

from app.models.book import (
    PoemIn,
    PoemModel,
    PoemPageModel,
    Letter,
    FlowerModel,
    PoemFlowerList,
    BookModel,
)
from app.models.order import OrderIn, OrderOut, create_order
from app.db import get_db
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(tags=["편지 분석"])


# ================
# API Routes
# ================


@router.post("/poems", response_model=PoemModel)
async def create_poem(request: PoemIn):
    poem = PoemModel(**request.dict())
    return await poem.create()


@router.post("/results", response_model=PoemFlowerList)
async def get_analyzed_results(request: Letter):
    fake_model_results = ["사랑", "결혼", "고백", "낭만", "남편"]

    # 모델 API에서 편지 키워드 불러오기
    keywords = fake_model_results

    results = PoemFlowerList()

    poem_list = []
    flower_list = []

    # TODO: 랜덤으로 가져올 것.
    for keyword in keywords:
        # 키워드별로 시 100개 가져오기
        keyword_poems = await PoemModel.find({"keywords": keyword}).limit(100).to_list()
        poem_list += keyword_poems

        # 키워드별로 꽃말 5개 가져오기
        keyword_flowers = (
            await FlowerModel.find({"keywords": keyword}).limit(5).to_list()
        )
        flower_list += keyword_flowers

    results.poems = poem_list
    results.flowers = flower_list
    # return results

    dummy_poem1 = PoemModel(
        _id=PydanticObjectId(),
        title="너를 위해",
        author="임재범",
        content="내 거친생각과 불안한 눈빛과",
        keywords=["사랑", "이별"],
    )
    dummy_poem2 = PoemModel(
        _id=PydanticObjectId(),
        title="안녕하세요",
        author="김시인",
        content="조약돌을 주웠다.",
        keywords=["사랑", "이별"],
    )
    dummy_poem3 = PoemModel(
        _id=PydanticObjectId(),
        title="여름바다",
        author="윤시인",
        content="여행가고싶다",
        keywords=["여행", "이별"],
    )

    dummy_results = PoemFlowerList()

    dummy_poem_sample = [dummy_poem1, dummy_poem2, dummy_poem3]
    dummy_poems = dummy_poem_sample * 30
    dummy_results.poems = dummy_poems

    dummy_flower_sample = [
        FlowerModel(
            _id=PydanticObjectId(),
            name="장미",
            symbol="열렬한 사랑",
            image_url="http://db.kookje.co.kr/news2000/photo/2020/0520/L20200520.22021005678i1.jpg",
            keywords=["사랑", "이별"],
        ),
        FlowerModel(
            _id=PydanticObjectId(),
            name="해바라기",
            symbol="너만 바라봐",
            image_url="http://db.kookje.co.kr/news2000/photo/2020/0520/L20200520.22021005678i1.jpg",
            keywords=["사랑", "이별"],
        ),
        FlowerModel(
            _id=PydanticObjectId(),
            name="튤립",
            symbol="청초한 눈망울",
            image_url="http://db.kookje.co.kr/news2000/photo/2020/0520/L20200520.22021005678i1.jpg",
            keywords=["사랑", "이별"],
        ),
    ]
    dummy_flowers = dummy_flower_sample * 5
    dummy_results.flowers = dummy_flowers

    return dummy_results
