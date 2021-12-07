from starlette.background import BackgroundTasks
from app.models.book import BookModel
from app.models import order
import json
from httpx import AsyncClient


# def test_create_order(test_app, monkeypatch):


#     assert response.status_code == 201
#     assert response.json() == test_order
