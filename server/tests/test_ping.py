from app import main
import pytest


@pytest.mark.asyncio
async def test_ping(test_app):
    response = await test_app.get("/")
    assert response.status_code == 200
