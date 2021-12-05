from sqlalchemy import future
from sqlalchemy.ext.asyncio.session import async_session
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.models.book import PoemModel, FlowerModel, BookModel

from app.config import Settings, get_config

config = get_config()

engine = create_async_engine(config.sqldb_uri, echo=True, future=True)
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

Base = declarative_base()


async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def get_db() -> AsyncSession:
    async with async_session() as session:
        yield session


# Mongo
async def init_mongo():
    mongo_client = AsyncIOMotorClient(config.mongo_uri)
    await init_beanie(
        mongo_client[config.mongo_db],
        document_models=[PoemModel, FlowerModel, BookModel],
    )
