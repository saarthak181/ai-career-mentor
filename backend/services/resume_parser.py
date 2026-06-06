from backend.utils.pdf_reader import extract_text_from_pdf
from backend.services.skill_extractor import extract_skills
from backend.services.resume_score import calculate_resume_score
from backend.services.ats_score import calculate_ats_score


def parse_resume(file_path: str) -> dict:
    text = extract_text_from_pdf(file_path)
    skills = extract_skills(text)
    resume_score = calculate_resume_score(skills)
    ats_score = calculate_ats_score(text)

    return {
        "text": text,
        "skills": skills,
        "resume_score": resume_score,
        "ats_score": ats_score,
        "word_count": len(text.split()),
    }
