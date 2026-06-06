from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.database import get_db
from database.models.user import User
from database.models.chat_history import ChatHistory
from backend.rag.retriever import retrieve_context
from backend.rag.llm_response import generate_response
from backend.core.dependencies import get_current_user

router = APIRouter(prefix="/mentor", tags=["Mentor"])


@router.post("/chat")
def chat(
    payload: dict,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    question = payload.get("question", "").strip()
    if not question:
        return {"answer": "Please ask a question."}

    context = retrieve_context(question)
    answer = generate_response(question, context)

    history = ChatHistory(
        user_id=current_user.id,
        question=question,
        answer=answer,
    )
    db.add(history)
    db.commit()

    return {"answer": answer, "context_used": context[:100] + "..."}


@router.get("/history")
def get_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    history = (
        db.query(ChatHistory)
        .filter(ChatHistory.user_id == current_user.id)
        .order_by(ChatHistory.created_at.desc())
        .limit(20)
        .all()
    )
    return [
        {
            "id": h.id,
            "question": h.question,
            "answer": h.answer,
            "created_at": h.created_at,
        }
        for h in history
    ]
