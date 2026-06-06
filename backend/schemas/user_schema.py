from pydantic import BaseModel, EmailStr


class UserResponse(BaseModel):
    id: str
    name: str
    email: str

    class Config:
        from_attributes = True
