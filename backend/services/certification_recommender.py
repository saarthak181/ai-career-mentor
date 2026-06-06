import pandas as pd
import os

_cert_df = None


def _get_df() -> pd.DataFrame:
    global _cert_df
    if _cert_df is None:
        path = os.path.join(os.getcwd(), "datasets", "certifications.csv")
        if not os.path.exists(path):
            path = os.path.normpath(os.path.join(os.path.dirname(__file__), "../../../datasets/certifications.csv"))
        _cert_df = pd.read_csv(path)
    return _cert_df


def recommend_certifications(missing_skills: list[str]) -> list[dict]:
    try:
        df = _get_df()
        results = []
        for skill in missing_skills:
            filtered = df[df["skill"].str.lower() == skill.strip().lower()]
            for _, row in filtered.iterrows():
                results.append({
                    "skill": skill,
                    "certification": row["certification"],
                })
        return results
    except Exception as e:
        print(f"certification_recommender error: {e}")
        return []
