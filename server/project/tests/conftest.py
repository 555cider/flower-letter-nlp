import pytest
import asyncio
from httpx import AsyncClient


from sqlalchemy.engine import create
from starlette.testclient import TestClient

from app.main import app, create_application
from app.config import get_config, Settings
from app.db import get_db

from sqlalchemy import future
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.models.book import PoemModel, FlowerModel, BookModel

config = get_config()

from app.main import app

test_db_url = config.sqldb_uri
test_engine = create_async_engine(test_db_url, echo=True, future=True)
test_async_session = sessionmaker(
    test_engine, class_=AsyncSession, expire_on_commit=False
)

Base = declarative_base()


async def init_db():
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def drop_db():
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)


async def init_mongo():
    mongo_client = AsyncIOMotorClient(config.mongo_uri)
    await init_beanie(
        mongo_client[config.mongo_db],
        document_models=[PoemModel, FlowerModel, BookModel],
    )


def config_override():
    return Settings(testing=1, sqldb_uri=config.sqldb_uri)


async def get_db_override() -> AsyncSession:
    async with test_async_session() as session:
        yield session


@pytest.fixture(scope="module")
def event_loop():
    loop = asyncio.get_event_loop()
    yield loop
    loop.close()


@pytest.fixture(scope="module")
async def test_app():
    app.dependency_overrides[get_config] = config_override
    async with AsyncClient(app=app, base_url="http://localhost:8000") as ac:
        yield ac
    # tear down


@pytest.fixture(scope="module")
async def test_app_with_db():
    await init_db()
    await init_mongo()

    app = create_application()
    app.dependency_overrides[get_config] = config_override
    app.dependency_overrides[get_db] = get_db_override

    client = TestClient(app)
    yield client
