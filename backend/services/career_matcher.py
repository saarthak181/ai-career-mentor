from backend.services.job_loader import load_jobs


def _jaccard_similarity(set_a: set, set_b: set) -> float:
    if not set_a and not set_b:
        return 0.0
    intersection = len(set_a & set_b)
    union = len(set_a | set_b)
    return intersection / union if union > 0 else 0.0


def match_careers(user_skills: list[str]) -> list[dict]:
    jobs = load_jobs()
    user_set = {s.strip().lower() for s in user_skills}
    results = []

    for _, row in jobs.iterrows():
        role = row["role"]
        role_skills_raw = str(row["skills"]).split(",")
        role_set = {s.strip().lower() for s in role_skills_raw}

        similarity = _jaccard_similarity(user_set, role_set)
        match_pct = round(similarity * 100, 1)

        # Also count direct matches for display
        matched = [s for s in role_skills_raw if s.strip().lower() in user_set]
        missing = [s.strip() for s in role_skills_raw if s.strip().lower() not in user_set]

        results.append({
            "role": role,
            "match_percentage": match_pct,
            "matched_skills": matched,
            "missing_skills": missing[:5],  # top 5 missing
        })

    results.sort(key=lambda x: x["match_percentage"], reverse=True)
    return results
