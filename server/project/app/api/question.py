from fastapi import (
    APIRouter,
    Depends,
)
from app.models.question import Question, create_question
from app.db import get_db
from sqlalchemy.ext.asyncio import AsyncSession


question_router = APIRouter(tags=["문의"])


@question_router.post("/question", summary="문의 요청", status_code=201)
async def post_question(
    request: Question,
    db: AsyncSession = Depends(get_db),
):
    """
    사용자가 문의를 제출하는 기능
    """

    new_order = await create_question(request, db)
    return new_order
