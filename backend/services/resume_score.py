def calculate_resume_score(skills: list[str]) -> int:
    score = max(0, min(len(skills) * 6, 60))  # up to 60 pts for skills
    if len(skills) >= 10:
        score += 20
    elif len(skills) >= 5:
        score += 10
    return min(score, 100)
