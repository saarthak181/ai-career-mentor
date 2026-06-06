from fastapi import APIRouter, Depends, HTTPException
from database.models.user import User
from backend.services.skill_gap import find_skill_gap
from backend.services.course_recommender import recommend_courses
from backend.services.project_recommender import recommend_projects
from backend.services.certification_recommender import recommend_certifications
from backend.services.roadmap_generator import generate_roadmap
from backend.core.dependencies import get_current_user

router = APIRouter(prefix="/recommendation", tags=["Recommendation"])


@router.post("/career-plan")
def career_plan(
    payload: dict,
    current_user: User = Depends(get_current_user),
):
    try:
        skills = payload.get("skills", [])
        target_role = payload.get("target_role", "")

        missing_skills = find_skill_gap(skills, target_role)
        roadmap = generate_roadmap(missing_skills)
        courses = recommend_courses(missing_skills)
        projects = recommend_projects(missing_skills)
        certifications = recommend_certifications(missing_skills)

        return {
            "target_role": target_role,
            "missing_skills": missing_skills,
            "roadmap": roadmap,
            "courses": courses,
            "projects": projects,
            "certifications": certifications,
        }
    except Exception as e:
        print(f"career-plan error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
