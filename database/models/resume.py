from sqlalchemy import Column, String, Integer, DateTime, Text, ForeignKey
from uuid import uuid4
from datetime import datetime
from database.models.base import Base


class Resume(Base):
    __tablename__ = "resumes"

    id = Column(String, primary_key=True, default=lambda: str(uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    filename = Column(String, nullable=True)
    extracted_text = Column(Text, nullable=True)
    skills_json = Column(Text, nullable=True)  # JSON array stored as string
    resume_score = Column(Integer, nullable=True)
    ats_score = Column(Integer, nullable=True)
    uploaded_at = Column(DateTime, default=datetime.utcnow)
