def calculate_ats_score(text: str) -> int:
    score = 30
    text_lower = text.lower()

    section_keywords = {
        "experience": 15,
        "education": 10,
        "skills": 10,
        "projects": 10,
        "summary": 5,
        "objective": 5,
        "certification": 8,
        "achievements": 7,
    }
    for keyword, points in section_keywords.items():
        if keyword in text_lower:
            score += points

    # Penalise very short resumes
    word_count = len(text.split())
    if word_count < 100:
        score -= 10
    elif word_count > 300:
        score += 5

    return max(0, min(score, 100))
