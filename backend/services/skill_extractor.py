from backend.data.skills_database import TECH_SKILLS


def extract_skills(text: str) -> list[str]:
    text_lower = text.lower()
    found = []
    for skill in TECH_SKILLS:
        if skill in text_lower:
            found.append(skill)
    return list(set(found))
