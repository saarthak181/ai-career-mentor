import pandas as pd
import os

_courses_df = None


def _get_df() -> pd.DataFrame:
    global _courses_df
    if _courses_df is None:
        path = os.path.join(os.getcwd(), "datasets", "courses.csv")
        if not os.path.exists(path):
            # fallback: relative to this file
            path = os.path.normpath(os.path.join(os.path.dirname(__file__), "../../../datasets/courses.csv"))
        _courses_df = pd.read_csv(path)
    return _courses_df


def recommend_courses(missing_skills: list[str]) -> list[dict]:
    try:
        df = _get_df()
        results = []
        for skill in missing_skills:
            filtered = df[df["skill"].str.lower() == skill.strip().lower()]
            for _, row in filtered.iterrows():
                results.append({
                    "skill": skill,
                    "course": row["course"],
                    "provider": row["provider"],
                })
        return results
    except Exception as e:
        print(f"course_recommender error: {e}")
        return []
