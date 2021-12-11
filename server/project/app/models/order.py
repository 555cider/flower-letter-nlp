from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float
from datetime import datetime
from app.db import Base
from sqlalchemy.orm import relationship
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.book import Book
from pydantic import BaseModel


class OrderModel(Base):
    """
    주문서.

    Attributes:
        * id (int): PK.
        * order_status (int): 주문 상태. FK --> OrderStatus
        * order_date (datetime): 주문 날짜.
        * price (float): 결제 금액.
        * address (str): 배송 주소.
        * delivery_name (str): 받는 분 이름
        * post_code (str): 우편번호
        * email (str): 주문자 이메일.
        * phone (str): 주문자 전화번호.
        * book_id (str): 생성된 시집의 ObejctId.
    """

    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    order_status = Column(Integer, ForeignKey("order_status.id"), nullable=False)
    order_date = Column(DateTime, nullable=False)
    price = Column(Float, nullable=False)
    name = Column(String(10), nullable=False)
    delivery_name = Column(String(10), nullable=False)
    address = Column(String(255), nullable=False)
    post_code = Column(String(10), nullable=False)
    email = Column(String(50), nullable=False)
    phone = Column(String(20))
    book_id = Column(String(24), nullable=False)

    def __init__(
        self, price, name, delivery_name, post_code, address, email, phone, book_id
    ) -> None:
        self.order_date = datetime.now()
        self.order_status = 0
        self.price = price
        self.name = name
        self.delivery_name = delivery_name
        self.post_code = post_code
        self.address = address
        self.email = email
        self.phone = phone
        self.book_id = book_id


class OrderStatusModel(Base):
    """
    주문상태.

    Attributes:
        * id (int): PK
        * status_name (str): 상태 이름
    """

    __tablename__ = "order_status"

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    status_name = Column(String(10), nullable=False)
    orders = relationship("OrderModel", backref="status", lazy=True)


# ===============
# SCHEMAS
# ===============
class OrderDetail(BaseModel):
    price: float
    name: str
    address: str
    email: str
    phone: str


class OrderIn(BaseModel):
    order: OrderDetail
    book: Book

    class Config:
        schema_extra = {
            "example": {
                "order": {
                    "price": 47000,
                    "name": "김철수",
                    "address": "서울시 강남구 강남동 11번지",
                    "email": "test@test.com",
                    "phone": "01012341234",
                },
                "book": {
                    "letter": "편지 내용...",
                    "flower_id": "61b065c6dd874c208dee0bc3",
                    "contents": [
                        {"type": "poem", "poem_id": "61b065c6dd874c208dee0bc3"},
                        {"type": "poem", "poem_id": "61b066202f194ac7dd807aef"},
                        {"type": "text", "text_content": "자유글 내용..."},
                        {"type": "text", "text_content": "자유글 내용 222..."},
                    ],
                    "font": "바른글씨체",
                    "color": "beige",
                },
            }
        }


class OrderOut(OrderDetail):
    id: int

    class Config:
        orm_mode = True


# ===========
# CRUD
# ===========


async def create_order(
    order: OrderDetail, book_id: str, db: AsyncSession
) -> OrderModel:
    # TODO: Add constructor
    new_order = OrderModel(**order.dict())
    new_order.order_status = 1  # 결제완료 상태
    new_order.order_date = datetime.now()
    new_order.book_id = book_id

    db.add(new_order)
    await db.commit()
    await db.refresh(new_order)
    return new_order


async def get_order(order_id: int, db: AsyncSession) -> OrderModel:
    return await db.query(OrderModel).filter(OrderModel.id == order_id).first()


async def update_order_status(
    order_id: int, db: AsyncSession, status: int
) -> OrderModel:
    order = await db.query(OrderModel).filter(OrderModel.id == order_id).first()
    order.order_status = status

    await db.commit()
    await db.refresh(order)
    return order
