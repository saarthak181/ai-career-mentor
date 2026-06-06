from pydantic import BaseModel


class CareerRequest(BaseModel):
    skills: list[str]


class SkillGapRequest(BaseModel):
    skills: list[str]
    target_role: str
