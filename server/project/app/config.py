"""
FastAPI server configuration
"""

from pydantic import BaseSettings, AnyUrl
from fastapi_mail import ConnectionConfig
import os

import logging
from functools import lru_cache

log = logging.getLogger("uvicorn")


class Settings(BaseSettings):
    """Server config settings"""

    environment: str = os.getenv("ENVIRONMENT", "dev")  # defaults to dev env
    testing: bool = os.getenv("TESTING", 0)  # whether testing mode
    allowed_origins: str = os.getenv("ALLOWED_ORIGINS")

    # Database settings
    sqldb_uri: AnyUrl = os.getenv("SQL_DB_URL")
    mongo_uri: str = os.getenv("MONGO_URL")
    mongo_db = os.getenv("MONGO_DB")

    # Email settings
    email_config = ConnectionConfig(
        MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
        MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
        MAIL_PORT=os.getenv("MAIL_PORT"),
        MAIL_SERVER=os.getenv("MAIL_SERVER"),
        MAIL_TLS=os.getenv("MAIL_TLS"),
        MAIL_SSL=os.getenv("MAIL_SSL"),
        MAIL_FROM=os.getenv("MAIL_FROM"),
        USE_CREDENTIALS=os.getenv("USE_CREDENTIALS"),
    )

    # Payment settings
    client_id: str = (os.getenv("CLIENT_ID"),)
    secret_key: str = os.getenv("SECRET_KEY")


@lru_cache()
def get_config() -> BaseSettings:
    log.info("Loading config settings from the environment...")
    return Settings()
