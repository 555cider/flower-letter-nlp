"""
FastAPI server configuration
"""

import os

from functools import lru_cache


class Settings:
    """Server config settings"""

    environment: str = os.getenv("ENVIRONMENT", "dev")  # defaults to dev env
    testing: bool = os.getenv("TESTING", 0)  # whether testing mode
    allowed_origins: str = os.getenv("ALLOWED_ORIGINS")
    api_url: str = os.getenv("API_URL")

    MAIL_USERNAME: str = (os.getenv("MAIL_USERNAME"),)
    MAIL_PASSWORD: str = (os.getenv("MAIL_PASSWORD"),)
    MAIL_PORT: str = (os.getenv("MAIL_PORT"),)
    MAIL_SERVER: str = (os.getenv("MAIL_SERVER"),)
    MAIL_USE_TSL: str = (os.getenv("MAIL_TLS"),)
    MAIL_USE_SSL: str = (os.getenv("MAIL_SSL"),)
    MAIL_DEFAULT_SENDER: str = (os.getenv("MAIL_FROM"),)
    USE_CREDENTIALS: str = (os.getenv("USE_CREDENTIALS"),)


@lru_cache()
def get_config() -> Settings:
    return Settings()
