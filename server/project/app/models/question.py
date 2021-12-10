from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    Boolean,
    Text,
)
from datetime import datetime

from sqlalchemy.sql.sqltypes import Boolean

from app.db import Base
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel


class QuestionModel(Base):
    """
    주문서.

    Attributes:
        * id (int): PK.
        * date (datetime): 문의 날짜
        * email (str): 문의자 이메일
        * name (str): 문의자 이름
        * phone (str): 문의자 전화번호
        * title (str): 문의 제목
        * content (text): 문의 내용
        * answered (bool): 답변완료 여부
    """

    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    date = Column(DateTime, nullable=False)
    answered = Column(Boolean, nullable=False)
    name = Column(String(20), nullable=False)
    email = Column(String(50), nullable=False)
    title = Column(String(30), nullable=False)
    content = Column(Text, nullable=False)

    def __init__(self, name, email, title, content) -> None:
        self.name = name
        self.email = email
        self.title = title
        self.content = content
        self.answered = False
        self.date = datetime.now()


# ===============
# SCHEMAS
# ===============
class Question(BaseModel):
    name: str
    email: str
    title: str
    content: str

    class Config:
        schema_extra = {
            "example": {
                "name": "김영희",
                "email": "test@test.com",
                "title": "배송관련 문의",
                "content": "안녕하세요 배송관련 문의드려요. 보통 얼마나 걸리나요?",
            }
        }


# ===========
# CRUD
# ===========


async def create_question(question: Question, db: AsyncSession):
    new_question = QuestionModel(
        question.name, question.email, question.title, question.content
    )

    db.add(new_question)
    await db.commit()
    await db.refresh(new_question)
    return new_question
