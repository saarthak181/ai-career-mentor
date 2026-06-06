def calculate_career_score(skills: list[str], missing_skills: list[str]) -> float:
    total = len(skills) + len(missing_skills)
    if total == 0:
        return 0.0
    return round((len(skills) / total) * 100, 1)
