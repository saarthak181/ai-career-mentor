from backend.services.job_loader import load_jobs


def find_skill_gap(user_skills: list[str], target_role: str) -> list[str]:
    jobs = load_jobs()
    user_set = {s.strip().lower() for s in user_skills}

    row = jobs[jobs["role"].str.lower() == target_role.lower()]
    if row.empty:
        return []

    required_skills = [s.strip() for s in str(row.iloc[0]["skills"]).split(",")]
    return [s for s in required_skills if s.strip().lower() not in user_set]
