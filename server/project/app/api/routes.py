from fastapi import APIRouter, Depends
from fastapi_mail import config
from pydantic.types import Json

from app.models.book import (
    PoemIn,
    PoemModel,
    Letter,
    FlowerModel,
    PoemFlowerList,
)
from app.models.schemas import ModelResults
from app.config import Settings, get_config

router = APIRouter(tags=["편지 분석"])

from httpx import AsyncClient
import json


# ================
# API Routes
# ================


@router.post("/poems", response_model=PoemModel)
async def create_poem(request: PoemIn):
    poem = PoemModel(**request.dict())
    return await poem.create()


async def call_model_api(client: AsyncClient, letter: str, config: Settings):
    print(config.ml_api_url)
    api_url = f"{config.ml_api_url}/classify"
    response = await client.post(
        url=api_url,
        json={"text": letter},
        timeout=None,
    )
    return response


@router.post("/results", response_model=PoemFlowerList)
async def get_analyzed_results(request: Letter, config: Settings = Depends(get_config)):
    print(request.letter_content)

    fake_results = ModelResults(
        emotions={"high": ["사랑"], "medium": ["희망"], "low": []},
        keywords=["도시", "자연", "감각"],
    )

    # 모델 API에서 편지 키워드 불러오기
    async with AsyncClient() as client:
        response = await call_model_api(client, request.letter_content, config)

    model_results = ModelResults(**json.loads(response.text))

    print(model_results)

    emotions = model_results.emotions
    keywords = model_results.keywords

    final_keywords = []

    if emotions.high or emotions.medium:
        final_keywords += emotions.high
        final_keywords += emotions.medium
        if len(keywords) >= 2:
            final_keywords += keywords[:2]
        elif len(keywords) == 1:
            final_keywords.append(keywords[0])

    elif emotions.low:
        final_keywords.append(emotions.low[0])
        count = 0
        for word in keywords:
            final_keywords.append(word)
            count += 1
            if count == 2:
                break

    elif keywords:
        count = 0
        for word in keywords:
            final_keywords.append(word)
            count += 1
            if count == 3:
                break

    print("FINAL KEYWORDS: ", final_keywords)

    results = PoemFlowerList()
    poem_list = []
    flower_list = []

    # TODO: 랜덤으로 가져오고 알고리즘 적용할 것
    for keyword in final_keywords:
        # 키워드별로 시 100개 가져오기
        keyword_poems = await PoemModel.find({"keywords": keyword}).limit(30).to_list()
        poem_list += keyword_poems

        # 키워드별로 꽃말 5개 가져오기
        keyword_flowers = (
            await FlowerModel.find({"keywords": keyword}).limit(3).to_list()
        )
        flower_list += keyword_flowers

    results.poems = poem_list
    results.flowers = flower_list
    results.keywords = final_keywords

    return results
