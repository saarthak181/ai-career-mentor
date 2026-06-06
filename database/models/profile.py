from sqlalchemy import Column, String, Integer, ForeignKey
from uuid import uuid4
from database.models.base import Base


class Profile(Base):
    __tablename__ = "profiles"

    id = Column(String, primary_key=True, default=lambda: str(uuid4()))
    user_id = Column(String, ForeignKey("users.id"), unique=True, nullable=False)
    college = Column(String, nullable=True)
    branch = Column(String, nullable=True)
    semester = Column(Integer, nullable=True)
    target_role = Column(String, nullable=True)
    career_score = Column(Integer, default=0)
