from fastapi_mail import FastMail, MessageSchema
from app.config import Settings
from app.models.book import BookModel
from app.models.order import OrderModel


async def send_email(
    config: Settings, order: OrderModel, book: BookModel, flower: str
) -> str:

    html = """
<html style="font-family:Arial, Helvetica, sans-serif; font-size: 0.8rem; width: 800px; height: 1500px">
  <head>
    <style>
        @font-face {{font-family: "sungsil"; src: url(https://flower-letter-resources.s3.ap-northeast-2.amazonaws.com/sungsil.ttf);
        }}
    </style>
  </head>
  <body>
    <div style="padding-left: 10vw; padding-right: 10vw;">
      <div style="background-color: #f2c0c6; display:flex;">
        <img style="width: 150px; margin-left: auto; margin-right: auto;" src="https://flower-letter-resources.s3.ap-northeast-2.amazonaws.com/logo_withoutbg.png" />
      </div>
      <div style="background-color: #faf4f4; padding: 20px; padding-left: 20%; padding-right: 20%;">
        <div style="font-size: 1.2rem; font-weight: bold; padding: 20px; text-align: center; margin-left:auto; margin-right:auto;">
          {name} 님, <br/> 꽃편지를 이용해 주셔서 감사합니다.
        </div>
        <div>
          <div style="font-size: 1.2rem; font-weight: bold; margin-left: auto; margin-right: auto; padding: 10px; text-align: center;">Order Summary</div>
          <div style="margin-left: auto; margin-right: auto; font-size: 0.9rem; text-align: center;">Order No. {order_id}</div>
          <div style="margin-left: auto; margin-right: auto; display:flex; width: 427px;">
            <div>
              <img src="https://flower-letter-resources.s3.ap-northeast-2.amazonaws.com/sample_img.png" style="height: 180px;"/>
            </div>
            <div style="margin-left: 10px; border-bottom: 2px solid #846c6c; border-top: 2px solid #846c6c; padding:0; height: 176px;">
              <table style="width: 300px; min-width: 180px; border-bottom: 1px solid #846c6c; padding: 15px; display: flex; flex-direction: column;">
                <tr style="display: flex; justify-content: space-between; width: 270px;">
                  <td style="font-weight: bold; text-align: left; width: 135px;">Book Color</td>
                  <td style="text-align: right; width: 135px;">{book_color}</td>
                </tr>
                <tr style="display: flex; justify-content: space-between; width: 270px;">
                  <td style="font-weight: bold; text-align: left; width: 135px;">Flower</td>
                  <td style="text-align: right; width: 135px;">{flower}</td>
                </tr>
                <tr style="display: flex; justify-content: space-between; width: 270px;">
                  <td style="font-weight: bold; text-align: left; width: 135px;">Font</td>
                  <td style="text-align: right; width: 135px;">{font}</td>
                </tr>
                <tr style="display: flex; justify-content: space-between; width: 270px;">
                  <td style="font-weight: bold; text-align: left; width: 135px;">Title</td>
                  <td style="text-align: right; width: 135px;">{title}</td>
                </tr>
              </table>
              <table style="width: 300px; min-width: 180px; padding: 15px;">
                <tr style="display: flex; justify-content: space-between; width: 270px">
                  <td style="font-weight: bold; text-align: left; width: 135px;">Price</td>
                  <td style="text-align: right; width: 135px;">₩ {price}</td>
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
              <td>{delivery_name}</td>
            </tr>
            <tr style="width: 360px; padding: 3px;">
              <td style="font-size: 0.9rem; font-weight: bold; width: 80px;">연락처</td>
              <td>{phone}</td>
            </tr>
            <tr style="width: 360px; padding: 3px;">
              <td style="font-size: 0.9rem; font-weight: bold; width: 80px;">우편번호</td>
              <td>{post_code}</td>
            </tr>
            <tr style="width: 360px; padding: 3px;">
              <td style="font-size: 0.9rem; font-weight: bold; width: 80px;">배송지</td>
              <td>{address}</td>
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
    """.format(
        name=order.name,
        order_id=order.id,
        book_color=book.color,
        flower=flower,
        font=book.font,
        title=book.title,
        price=order.price,
        delivery_name=order.delivery_name,
        phone=order.phone,
        post_code=order.post_code,
        address=order.address,
    )

    message = MessageSchema(
        subject=f"[꽃편지] {order.name}님의 주문이 완료되었습니다. #{order.id}",
        recipients=[order.email],  # List of recipients
        html=html,
        subtype="html",
    )

    fm = FastMail(config.email_config)
    await fm.send_message(message)
    print("email sent successfully.")
    return "OK"
