from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from database.database import get_db
from database.models.user import User
from backend.core.jwt_handler import get_user_id_from_token

security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
) -> User:
    token = credentials.credentials
    user_id = get_user_id_from_token(token)

    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )
    return user


def get_optional_user(
    credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer(auto_error=False)),
    db: Session = Depends(get_db),
) -> User | None:
    if credentials is None:
        return None
    token = credentials.credentials
    user_id = get_user_id_from_token(token)
    if user_id is None:
        return None
    return db.query(User).filter(User.id == user_id).first()
