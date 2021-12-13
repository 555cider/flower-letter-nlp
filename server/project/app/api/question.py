from fastapi import APIRouter, Depends, BackgroundTasks, Form, Header, status
from app.models.question import (
    Question,
    QuestionOut,
    create_question,
    read_all_questions,
    read_question_by_id,
    update_question_status,
)
from app.db import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from app.helpers.email import send_question_answer_email
from fastapi.responses import RedirectResponse
from app.config import Settings, get_config


question_router = APIRouter(tags=["문의"])


@question_router.get(
    "/question", summary="모든 문의 조회", status_code=200, response_model=List[QuestionOut]
)
async def get_all_questions(db: AsyncSession = Depends(get_db)):
    """
    모든 문의 조회
    """
    all_questions = await read_all_questions(db)
    return all_questions


@question_router.get(
    "/question/{question_id}",
    summary="문의 조회",
    status_code=200,
    response_model=QuestionOut,
)
async def get_question_by_id(question_id: int, db: AsyncSession = Depends(get_db)):
    """
    문의 조회
    """
    question = await read_question_by_id(question_id, db)
    return question


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


@question_router.post("/question_answer", summary="문의 답변 완료", status_code=200)
async def post_question_reply(
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
    config: Settings = Depends(get_config),
    inquiry_id: str = Form(...),
    email: str = Form(...),
    reply: str = Form(...),
    origin: Optional[str] = Header(None),
):
    """
    문의 답변 완료
    """
    background_tasks.add_task(
        send_question_answer_email, config, reply, email
    )  # 이메일 전송

    await update_question_status(int(inquiry_id), db)

    redirect_url = f"{origin}/inquiry"
    return RedirectResponse(redirect_url, status_code=status.HTTP_302_FOUND)
