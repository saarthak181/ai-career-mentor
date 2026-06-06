from fastapi import APIRouter, Depends
from database.models.user import User
from backend.schemas.career_schema import CareerRequest, SkillGapRequest
from backend.services.career_matcher import match_careers
from backend.services.skill_gap import find_skill_gap
from backend.services.career_score import calculate_career_score
from backend.core.dependencies import get_current_user

router = APIRouter(prefix="/career", tags=["Career"])


@router.post("/match")
def career_match(
    request: CareerRequest,
    current_user: User = Depends(get_current_user),
):
    return match_careers(request.skills)


@router.post("/gap-analysis")
def gap_analysis(
    request: SkillGapRequest,
    current_user: User = Depends(get_current_user),
):
    missing_skills = find_skill_gap(request.skills, request.target_role)
    score = calculate_career_score(request.skills, missing_skills)
    return {
        "target_role": request.target_role,
        "career_score": score,
        "missing_skills": missing_skills,
        "user_skills": request.skills,
    }
