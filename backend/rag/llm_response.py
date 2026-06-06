from backend.config.settings import settings
import os

def generate_response(question: str, context: str) -> str:
    key = settings.GEMINI_API_KEY or os.getenv("GEMINI_API_KEY", "")
    if key and key not in ("dummy", "dummy_key", ""):
        return _gemini_response(question, context, key)
    return _fallback_response(question, context)


def _gemini_response(question: str, context: str, api_key: str) -> str:
    try:
        import google.generativeai as genai
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel("gemini-2.0-flash-lite")
        prompt = f"""You are an AI career mentor for students.
Use this context to help answer: {context}

Student's question: {question}

Give a helpful, actionable, and encouraging answer in 2-3 sentences."""
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Gemini error: {str(e)}\n\n{_fallback_response(question, context)}"


def _fallback_response(question: str, context: str) -> str:
    return (
        f"{context}\n\n"
        "💡 Tip: Add your Gemini API key to .env (GEMINI_API_KEY) for richer AI-powered responses."
    )
