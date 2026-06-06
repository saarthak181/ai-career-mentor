import os
import json
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from database.database import get_db
from database.models.resume import Resume
from database.models.user import User
from backend.services.resume_parser import parse_resume
from backend.core.dependencies import get_current_user

router = APIRouter(prefix="/resume", tags=["Resume"])

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")

    safe_name = f"{current_user.id}_{file.filename}"
    file_path = os.path.join(UPLOAD_FOLDER, safe_name)

    content = await file.read()
    with open(file_path, "wb") as f:
        f.write(content)

    result = parse_resume(file_path)

    resume_record = Resume(
        user_id=current_user.id,
        filename=file.filename,
        extracted_text=result["text"][:5000],  # limit stored text
        skills_json=json.dumps(result["skills"]),
        resume_score=result["resume_score"],
        ats_score=result["ats_score"],
    )
    db.add(resume_record)
    db.commit()

    return {
        "skills": result["skills"],
        "resume_score": result["resume_score"],
        "ats_score": result["ats_score"],
        "word_count": result["word_count"],
        "resume_id": resume_record.id,
    }


@router.get("/latest")
def get_latest_resume(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    resume = (
        db.query(Resume)
        .filter(Resume.user_id == current_user.id)
        .order_by(Resume.uploaded_at.desc())
        .first()
    )
    if not resume:
        return None

    return {
        "resume_score": resume.resume_score,
        "ats_score": resume.ats_score,
        "skills": json.loads(resume.skills_json or "[]"),
        "uploaded_at": resume.uploaded_at,
    }
