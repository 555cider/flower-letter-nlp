from fastapi import APIRouter, Depends

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
import random

# ================
# API Routes
# ================


@router.post("/poems", response_model=PoemModel)
async def create_poem(request: PoemIn):
    poem = PoemModel(**request.dict())
    return await poem.create()


async def call_model_api(client: AsyncClient, letter: str, config: Settings):
    print(config.ml_api_url)
    # api_url = f"{config.ml_api_url}/classify"
    api_url = "https://ml-testapi.flowerletter.co.kr/classify"
    response = await client.post(
        url=api_url,
        json={"text": letter},
        timeout=None,
    )
    return response


@router.post("/results", response_model=PoemFlowerList)
async def get_analyzed_results(request: Letter, config: Settings = Depends(get_config)):
    print(request.letter_content)

    # 모델 API에서 편지 키워드 불러오기
    async with AsyncClient() as client:
        response = await call_model_api(client, request.letter_content, config)

    model_results = ModelResults(**json.loads(response.text))

    print(model_results)

    emotions = model_results.emotions
    keywords = model_results.keywords

    final_keywords = []

    keywords_dict = {
        "생각": "생각, 아련함",
        "죽음": "생명과 죽음",
        "자연": "자연",
        "가족": "가족",
        "시간": "시간, 세월",
        "신체": "우리 모습",
        "집": "집",
        "문학": "문학적",
        "감각": "느낌, 기억",
        "공간": "여정, 이동",
        "도시": "도시생활",
        "숫자": "숫자",
    }

    # 프론트로 보내줄 키워드 선정

    if emotions.high or emotions.medium:
        final_keywords += emotions.high
        final_keywords += emotions.medium
        count = 0
        for word in keywords:
            final_keywords.append(word)
            count += 1
            if count == 3:
                break

    elif emotions.low:
        final_keywords.append(emotions.low[0])
        count = 0
        for word in keywords:
            final_keywords.append(word)
            count += 1
            if count == 3:
                break

    elif keywords:
        count = 0
        for word in keywords:
            final_keywords.append(word)
            count += 1
            if count == 3:
                break

    print("FINAL KEYWORDS: ", final_keywords)

    translated_keywords = []
    for word in final_keywords:
        if word in keywords_dict:
            translated_keywords.append(keywords_dict[word])
        else:
            translated_keywords.append(word)

    # 가장 키워드가 많이 매칭된 시와 꽃말을 쿼리
    keyword_poems = await PoemModel.aggregate(
        aggregation_pipeline=[
            {
                "$addFields": {
                    "count": {
                        "$size": {"$setIntersection": ["$keywords", final_keywords]}
                    }
                }
            },
            {"$sort": {"count": -1}},
            {"$limit": 100},
        ]
    ).to_list()

    # 시집 셔플
    random.shuffle(keyword_poems)

    keyword_flowers = await FlowerModel.aggregate(
        aggregation_pipeline=[
            {
                "$addFields": {
                    "count": {
                        "$size": {"$setIntersection": ["$keywords", final_keywords]}
                    }
                }
            },
            {"$sort": {"count": -1}},
            {"$limit": 15},
        ]
    ).to_list()

    # 꽃말 길이 줄이기
    for index, flower in enumerate(keyword_flowers):
        symbols = flower["symbol"].split(",")
        if len(symbols) >= 3:
            keyword_flowers[index]["symbol"] = (",").join(symbols[:3])

    results = PoemFlowerList()
    results.poems = keyword_poems
    results.flowers = keyword_flowers
    results.keywords = translated_keywords

    return results
