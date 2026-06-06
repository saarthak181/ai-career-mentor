from pydantic_settings import BaseSettings
from functools import lru_cache
import os


class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./careermentor.db"
    SECRET_KEY: str = "change-this-to-a-strong-random-secret-key-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24
    GEMINI_API_KEY: str = ""

    class Config:
        env_file = os.path.join(os.path.dirname(__file__), "../../.env")
        env_file_encoding = "utf-8"


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
