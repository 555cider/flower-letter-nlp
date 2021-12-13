from fastapi import (
    APIRouter,
    Depends,
)
from app.models.question import (
    Question,
    QuestionOut,
    create_question,
    read_all_questions,
    update_question_status,
)
from app.db import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List


question_router = APIRouter(tags=["문의"])


@question_router.get(
    "/question", summary="문의 조회", status_code=200, response_model=List[QuestionOut]
)
async def get_all_questions(db: AsyncSession = Depends(get_db)):
    """
    스태프가 문의를 불러올 수 있는 기능
    """
    all_questions = await read_all_questions(db)
    return all_questions


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


@question_router.patch("/question", summary="문의 답변 완료", status_code=200)
async def patch_question_status(
    question_id: int,
    db: AsyncSession = Depends(get_db),
):
    """
    사용자가 문의를 제출하는 기능
    """

    updated_question = await update_question_status(question_id, db)
    return updated_question
