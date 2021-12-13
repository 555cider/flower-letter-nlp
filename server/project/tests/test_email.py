from fastapi_mail import config
from app.helpers.email import send_order_email
from app.config import get_config
from app.models.order import OrderModel
from app.models.book import BookModel
import pytest

# TODO: test config
config = get_config()

# Integration test to send email
@pytest.mark.asyncio
# @pytest.mark.skip(reason="이메일 확인 완료.")
async def test_send_email(test_app_with_db):
    order = OrderModel(
        20000,
        "김철수",
        "박영희",
        "06808",
        "서울시 강남구",
        "yuliekorea@gmail.com",
        "12341234",
        "61b3082db71812f01331ef67",
    )

    book = BookModel(
        **{
            "title": "너에게 보내는 시집",
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
        }
    )

    result = await send_order_email(config, order, book, "해바라기")
    assert result == "OK"
