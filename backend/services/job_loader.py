import pandas as pd
import os

_jobs_df = None


def load_jobs() -> pd.DataFrame:
    global _jobs_df
    if _jobs_df is None:
        path = os.path.join(os.getcwd(), "database", "jobs.csv")
        if not os.path.exists(path):
            path = os.path.normpath(os.path.join(os.path.dirname(__file__), "../../../database/jobs.csv"))
        _jobs_df = pd.read_csv(path)
    return _jobs_df
