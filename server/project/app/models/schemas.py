from pydantic import BaseModel
from typing import List


class ResponseMessage(BaseModel):
    message: str


class Emotions(BaseModel):
    high: List[str] = []
    medium: List[str] = []
    low: List[str] = []


class ModelResults(BaseModel):
    emotions: Emotions
    keywords: List[str]
