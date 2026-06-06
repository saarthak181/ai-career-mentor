import pandas as pd
import os

_projects_df = None


def _get_df() -> pd.DataFrame:
    global _projects_df
    if _projects_df is None:
        path = os.path.join(os.getcwd(), "datasets", "projects.csv")
        if not os.path.exists(path):
            path = os.path.normpath(os.path.join(os.path.dirname(__file__), "../../../datasets/projects.csv"))
        _projects_df = pd.read_csv(path)
    return _projects_df


def recommend_projects(missing_skills: list[str]) -> list[dict]:
    try:
        df = _get_df()
        results = []
        for skill in missing_skills:
            filtered = df[df["skill"].str.lower() == skill.strip().lower()]
            for _, row in filtered.iterrows():
                results.append({
                    "skill": skill,
                    "project": row["project"],
                    "difficulty": row["difficulty"],
                })
        return results
    except Exception as e:
        print(f"project_recommender error: {e}")
        return []
