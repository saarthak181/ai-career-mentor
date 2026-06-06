from jose import jwt, JWTError
from datetime import datetime, timedelta
from typing import Optional
from backend.config.settings import settings


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    payload = data.copy()
    expire = datetime.utcnow() + (
        expires_delta or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    payload.update({"exp": expire, "iat": datetime.utcnow()})
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def decode_access_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        return payload
    except JWTError:
        return None


def get_user_id_from_token(token: str) -> Optional[str]:
    payload = decode_access_token(token)
    if payload is None:
        return None
    return payload.get("sub")
