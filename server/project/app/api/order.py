from typing import Any
import json
from beanie.odm.fields import PydanticObjectId

# import httpx
import requests
from fastapi import (
    APIRouter,
    Depends,
    BackgroundTasks,
    Request,
    HTTPException,
    status,
)
from fastapi.responses import RedirectResponse
from requests.auth import HTTPBasicAuth

from app.config import Settings, get_config

from typing import List

from app.models.book import (
    PoemPageModel,
    BookModel,
)
from app.models.order import (
    OrderIn,
    OrderOut,
    create_order,
    update_order_status,
    get_order,
    order_get_all,
)
from app.db import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from app.helpers.email import send_order_email
from app.models.book import FlowerModel

order_router = APIRouter(tags=["주문"])

# TODO: 검증 논리 추가
# TODO: try & catch 로 페이지 리디렉션
@order_router.post("/pay", summary="결제")
async def pay(
    request: Request,
    background_tasks: BackgroundTasks,
    config: Settings = Depends(get_config),
    db: AsyncSession = Depends(get_db),
):
    """
    결제요청.

    - FE에서 주문번호로 결제요청을 보내면, PG사를 거쳐 Server side auth를 위해 이 주소로 POST요청이 오게 된다.
    - 인증을 거친 후 pg사의 결제승인 API로 요청을 보내 결제 성공/실패 메시지를 받는다.
    - 결제 성공시 주문의 상태를 '결제완료'로 변경 후, 사용자에게 이메일 발송.
    - 결제 성공/실패 여부를 반환.
    """
    request_body = await request.form()

    if request_body["authResultCode"] != "0000":
        raise HTTPException(status_code=400, detail="Payment not authorized.")

    response = requests.post(
        "https://sandbox-api.nicepay.co.kr/v1/payments/" + request_body["tid"],
        json={"amount": request_body["amount"]},
        headers={"Content-type": "application/json"},
        auth=HTTPBasicAuth(config.client_id, config.secret_key),
    )

    resDict = json.loads(response.text)

    if resDict["resultCode"] != "0000":
        raise requests.exceptions.RequestException

    # 결제 비즈니스 로직 구현
    order_id = int(resDict["orderId"])
    order = await get_order(order_id, db)
    book = await BookModel.get(PydanticObjectId(order.book_id))
    await update_order_status(order_id, db, 2)  # 결제 완료 상태

    # 꽃 이름
    flower = await FlowerModel.get(PydanticObjectId(book.flower_id))

    background_tasks.add_task(
        send_order_email, config, order, book, flower.flower
    )  # 이메일 전송

    redirect_url = f"{request.headers['origin']}/checkout?order={order_id}"
    return RedirectResponse(redirect_url, status_code=status.HTTP_302_FOUND)


@order_router.post(
    "/orders", response_model=OrderOut, status_code=201, summary="주문 & 시집 생성"
)
async def post_order(
    request: OrderIn,
    db: AsyncSession = Depends(get_db),
):
    """
    주문 & 시집 데이터 생성.
    - FE에서 주문정보 & 시집정보를 받는다.
    - 사용자가 결제하기를 눌렀을때 호출되며, 주문정보를 반환한다.
    - 주문정보 데이터를 FE에서 성공적으로 받은후에 /pay(POST)를 호출해 결제를 진행하게 된다.
    """

    new_book = BookModel(**request.book.dict())

    await new_book.create()
    new_order = await create_order(request.order, str(new_book.id), db)

    return new_order


@order_router.get("/orders", summary="모든 주문 리스트 조회")
async def get_all_orders(db: AsyncSession = Depends(get_db)):
    """
    백오피스용 모든 주문 정보 조회.
    """
    all_orders = await order_get_all(db)
    return all_orders
