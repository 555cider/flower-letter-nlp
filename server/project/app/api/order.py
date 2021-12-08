from os import name
from typing import Any
import json
from beanie.odm.fields import PydanticObjectId
from fastapi import (
    APIRouter,
    Depends,
    Body,
    status,
    HTTPException,
    BackgroundTasks,
    requests,
    Request,
)
from requests.auth import HTTPBasicAuth
from fastapi_mail import FastMail, MessageSchema

from app.config import Settings, get_config


from app.models.book import (
    PoemPageModel,
    BookModel,
)
from app.models.order import OrderIn, OrderOut, create_order
from app.db import get_db
from sqlalchemy.ext.asyncio import AsyncSession


order_router = APIRouter(tags=["Order"])


@order_router.post("/pay", summary="결제")
async def pay(
    request: Any,
    background_tasks: BackgroundTasks,
    config: Settings = Depends(get_config),
):
    """
    결제요청.

    - FE에서 주문번호로 결제요청을 보내면, PG사를 거쳐 Server side auth를 위해 이 주소로 POST요청이 오게 된다.
    - 인증을 거친 후 pg사의 결제 API로 요청을 보내 결제 성공/실패 메시지를 받는다.
    - 결제 성공시 주문의 상태를 '결제완료'로 변경 후, 사용자에게 이메일 발송.
    - 결제 성공/실패 여부를 반환.
    """
    try:
        response = requests.post(
            "https://sandbox-api.nicepay.co.kr/v1/payments/" + request.form["tid"],
            json={"amount": request.form["amount"]},
            headers={"Content-type": "application/json"},
            auth=HTTPBasicAuth(config.client_id, config.secret_key),
        )

        resDict = json.loads(response.text)
        print(resDict)

        # 결제 비즈니스 로직 구현

        # # 주문확인 이메일 전송
        # background_tasks.add_task(send_email, "yuliekorea@gmail.com", new_order)

        # return render_template("response.html", resultMsg=resDict["resultMsg"])

    except requests.exceptions.RequestException as e:
        raise SystemExit(e)


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
    new_contents = []
    for req_content in request.book.contents:
        # TODO: use enum class
        if req_content.type == "poem":
            poem = PoemPageModel(poem_id=PydanticObjectId(req_content.poem_id))
            new_contents.append(poem)
        else:
            new_contents.append(req_content)

    new_book = BookModel(
        letter=request.book.letter,
        flower_id=PydanticObjectId(request.book.flower_id),
        contents=new_contents,
    )

    await new_book.create()
    new_order = await create_order(request.order, str(new_book.id), db)

    return new_order


async def send_email(
    email: str, config: Settings = Depends(get_config)
):
    # TODO: 예쁜 이메일 템플릿 만들기

    html = """
    <b>주문이 완료되었습니다.</b> 
    <p>주문번호는 </p> 
    """ 
    message = MessageSchema(
        subject="주문이 완료되었습니다~~~",
        recipients=[email],  # List of recipients
        body=html,
        subtype="html",
    )
    print(config)
    fm = FastMail(config.email_config)
    await fm.send_message(message)
    print("email sent successfully.")



@order_router.post(
    "/mailtest", summary="메일보내기 테스트"
)
async def confirm_mail(
    background_tasks: BackgroundTasks):

    background_tasks.add_task(send_email, "sanghunkim.nz@gmail.com")

    return "mail sent"
