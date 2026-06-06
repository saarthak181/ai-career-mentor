from pydantic import BaseModel
from typing import Optional


class ProfileUpdate(BaseModel):
    college: Optional[str] = None
    branch: Optional[str] = None
    semester: Optional[int] = None
    target_role: Optional[str] = None


class ProfileResponse(BaseModel):
    id: str
    user_id: str
    college: Optional[str]
    branch: Optional[str]
    semester: Optional[int]
    target_role: Optional[str]
    career_score: int

    class Config:
        from_attributes = True
