from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.database import engine
from database.models import base

from backend.api.auth.auth_routes import router as auth_router
from backend.api.resume.resume_routes import router as resume_router
from backend.api.career.career_routes import router as career_router
from backend.api.recommendation.recommendation_routes import router as recommendation_router
from backend.api.mentor.mentor_routes import router as mentor_router
from backend.api.profile.profile_routes import router as profile_router

base.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Career Mentor API",
    description="Empowering students with AI-driven career guidance",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(resume_router)
app.include_router(career_router)
app.include_router(recommendation_router)
app.include_router(mentor_router)
app.include_router(profile_router)


@app.get("/")
def root():
    return {"message": "AI Career Mentor API v2.0", "status": "running"}


@app.get("/health")
def health():
    return {"status": "healthy"}
