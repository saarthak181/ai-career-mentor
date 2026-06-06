from sqlalchemy import Column, String, Integer, ForeignKey
from uuid import uuid4
from database.models.base import Base


class Roadmap(Base):
    __tablename__ = "roadmaps"

    id = Column(String, primary_key=True, default=lambda: str(uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    week_no = Column(Integer, nullable=False)
    title = Column(String, nullable=False)
    status = Column(String, default="pending")  # pending | in_progress | done
