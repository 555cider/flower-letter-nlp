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
    Response,
)
from requests.auth import HTTPBasicAuth
from fastapi_mail import FastMail, MessageSchema

from app.config import Settings, get_config


from app.models.book import (
    PoemPageModel,
    BookModel,
)
from app.models.schemas import ResponseMessage
from app.models.order import OrderIn, OrderOut, create_order, update_order_status
from app.db import get_db
from sqlalchemy.ext.asyncio import AsyncSession

config = get_config()

order_router = APIRouter(tags=["주문"])


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
        request_body = await request.json()

        if request_body.form["authResultCode"] != "0000":
            raise requests.exceptions.RequestException

        response = requests.post(
            "https://sandbox-api.nicepay.co.kr/v1/payments/" + request.form["tid"],
            json={"amount": request.form["amount"]},
            headers={"Content-type": "application/json"},
            auth=HTTPBasicAuth(config.client_id, config.secret_key),
        )

        # print(resDict)
        resDict = json.loads(response.text)

        if resDict["resultCode"] != "0000":
            raise requests.exceptions.RequestException

        # 결제 비즈니스 로직 구현
        orderId = resDict["orderId"]
        order = await update_order_status(order_id=orderId, status=2)  # 결제 완료 상태
        background_tasks.add_task(send_email, order.email, order)  # 이메일 전송

        return Response(status_code=200)

    except requests.exceptions.RequestException as e:
        return Response(status_code=400)


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
        # TODO: add backend logic to verify price
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


async def send_email(email: str):
    # TODO: 예쁜 이메일 템플릿 만들기
    # 139, 143, 147, 151 > 옵션, 170, 174, 178, 182 > 배송정보

    html = """
<html style="font-family:Arial, Helvetica, sans-serif; font-size: 0.8rem; width: 800px; height: 1500px">
  <head>
    <style>
        @font-face {
            font-family: "sungsil";
            src: url(https://flower-letter-resources.s3.ap-northeast-2.amazonaws.com/sungsil.ttf);
        }
    </style>
  </head>
  <body>
    <div style="padding-left: 10vw; padding-right: 10vw;">
      <div style="background-color: #f2c0c6; display:flex;">
        <img style="width: 150px; margin-left: auto; margin-right: auto;" src="https://flower-letter-resources.s3.ap-northeast-2.amazonaws.com/logo_withoutbg.png" />
      </div>
      <div style="background-color: #faf4f4; padding: 20px; padding-left: 20%; padding-right: 20%;">
        <div style="font-size: 1.2rem; font-weight: bold; padding: 20px; text-align: center; margin-left:auto; margin-right:auto;">
          정율리 님, <br/> 꽃편지를 이용해 주셔서 감사합니다.
        </div>
        <div>
          <div style="font-size: 1.2rem; font-weight: bold; margin-left: auto; margin-right: auto; padding: 10px; text-align: center;">Order Summary</div>
          <div style="margin-left: auto; margin-right: auto; font-size: 0.9rem; text-align: center;">Order No. 4729811</div>
          <div style="margin-left: auto; margin-right: auto; display:flex; width: 427px;">
            <div>
              <img src="https://flower-letter-resources.s3.ap-northeast-2.amazonaws.com/sample_img.png" style="height: 180px;"/>
            </div>
            <div style="margin-left: 10px; border-bottom: 2px solid #846c6c; border-top: 2px solid #846c6c; padding:0; height: 176px;">
              <table style="width: 300px; min-width: 180px; border-bottom: 1px solid #846c6c; padding: 15px; display: flex; flex-direction: column;">
                <tr style="display: flex; justify-content: space-between; width: 270px;">
                  <td style="font-weight: bold; text-align: left; width: 135px;">Book Color</td>
                  <td style="text-align: right; width: 135px;">White</td>
                </tr>
                <tr style="display: flex; justify-content: space-between; width: 270px;">
                  <td style="font-weight: bold; text-align: left; width: 135px;">Flower</td>
                  <td style="text-align: right; width: 135px;">Rose</td>
                </tr>
                <tr style="display: flex; justify-content: space-between; width: 270px;">
                  <td style="font-weight: bold; text-align: left; width: 135px;">Font</td>
                  <td style="text-align: right; width: 135px;">성실체</td>
                </tr>
                <tr style="display: flex; justify-content: space-between; width: 270px;">
                  <td style="font-weight: bold; text-align: left; width: 135px;">Title</td>
                  <td style="text-align: right; width: 135px;">너에게 쓰는 편지</td>
                </tr>
              </table>
              <table style="width: 300px; min-width: 180px; padding: 15px;">
                <tr style="display: flex; justify-content: space-between; width: 270px">
                  <td style="font-weight: bold; text-align: left; width: 135px;">Price</td>
                  <td style="text-align: right; width: 135px;">₩ 45,000</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div style="margin-top: 20px; margin-bottom: 30px;">
          <div style="font-size: 1.2rem; font-weight: bold; padding: 20px; margin-left: auto; margin-right: auto; text-align: center;">
            Delivery Info
          </div>
          <table style="border-left: 2px solid #846c6c; padding-left: 20px; margin-left: auto; margin-right: auto; width: 430px;">
            <tr style="width: 360px; padding: 3px;">
              <td style="font-size: 0.9rem; font-weight: bold; width: 80px;"> 받는분 </td>
              <td>김상훈</td>
            </tr>
            <tr style="width: 360px; padding: 3px;">
              <td style="font-size: 0.9rem; font-weight: bold; width: 80px;">연락처</td>
              <td>010-1234-5678</td>
            </tr>
            <tr style="width: 360px; padding: 3px;">
              <td style="font-size: 0.9rem; font-weight: bold; width: 80px;">우편번호</td>
              <td>32373</td>
            </tr>
            <tr style="width: 360px; padding: 3px;">
              <td style="font-size: 0.9rem; font-weight: bold; width: 80px;">배송지</td>
              <td>서울시 서대문구 연희로 00길 99 xx빌라 123호</td>
            </tr>
          </table>
        </div>
      </div>
      <div style="display: flex; background-color: #f2c0c6; padding: 20px;">
        <div style="font-size: 0.7rem; text-align: center; color: #444; margin-left:auto; margin-right:auto; width:100%;">
          <div>010-1212-3434</div>
          <div style="text-decoration: none !important;">yulie@flowerletter.co.kr</div>
          <div>서울시 강남구 언주로 000, xx빌딩</div>
          <div>© 2021 꽃편지</div>
        </div>
      </div>
    </div>
  </body>
</html>
    """

    message = MessageSchema(
        subject="주문확인서 - 정율리님",
        recipients=[email],  # List of recipients
        html=html,
        subtype="html",
    )

    fm = FastMail(config.email_config)
    await fm.send_message(message)
    print("email sent successfully.")
