from os import name
from typing import Any
import json
from beanie.odm.fields import PydanticObjectId
from fastapi import (
    APIRouter,
    Depends,
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

clientId = "S2_93226cc455504b0a910b7ab5a804683b"
secretKey = "4696da89c2d64cea80ad520ac1974195"


@order_router.post("/pay")
async def pay(request: Any):
    try:
        response = requests.post(
            "https://sandbox-api.nicepay.co.kr/v1/payments/" + request.form["tid"],
            json={"amount": request.form["amount"]},
            headers={"Content-type": "application/json"},
            auth=HTTPBasicAuth(clientId, secretKey),
        )

        resDict = json.loads(response.text)
        print(resDict)

        # 결제 비즈니스 로직 구현

        return render_template("response.html", resultMsg=resDict["resultMsg"])

    except requests.exceptions.RequestException as e:
        raise SystemExit(e)


@order_router.post("/orders", response_model=OrderOut, status_code=201)
async def post_order(
    background_tasks: BackgroundTasks,
    request: OrderIn,
    db: AsyncSession = Depends(get_db),
):
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

    # 주문확인 이메일 전송
    background_tasks.add_task(send_email, "yuliekorea@gmail.com", new_order)

    return new_order


async def send_email(
    email: str, order_details: OrderOut, config: Settings = Depends(get_config)
):
    # TODO: 예쁜 이메일 템플릿 만들기

    html = """
    <b>주문이 완료되었습니다.</b> 
    <p>주문번호는 </p> 
    """ + str(
        order_details.id
    )
    message = MessageSchema(
        subject="주문이 완료되었습니다~~~",
        recipients=[email],  # List of recipients
        body=html,
        subtype="html",
    )

    fm = FastMail(config.email_config)
    await fm.send_message(message)
    print("email sent successfully.")
