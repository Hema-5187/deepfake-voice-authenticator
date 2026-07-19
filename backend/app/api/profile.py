from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.models.database import get_db
from app.models.user import User

from app.dependencies import get_current_user

from app.services.profile_service import profile_service

router = APIRouter()


@router.get("/")
def get_profile(

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_user)

):

    return profile_service.get_profile(
        db,
        current_user
    )