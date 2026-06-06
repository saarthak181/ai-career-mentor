def generate_roadmap(missing_skills: list[str]) -> list[dict]:
    roadmap = []
    for i, skill in enumerate(missing_skills, start=1):
        roadmap.append({
            "week": i,
            "focus_skill": skill,
            "goal": f"Learn and practice {skill}",
            "status": "pending",
        })
    return roadmap
