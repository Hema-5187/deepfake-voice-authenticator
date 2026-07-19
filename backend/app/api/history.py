from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.models.database import get_db
from app.models.user import User

from app.dependencies import get_current_user

from app.services.history_service import history_service

router = APIRouter()


@router.get("/")
def get_prediction_history(

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_user)

):

    return history_service.get_history(
        db,
        current_user.id
    )


@router.delete("/{prediction_id}")
def delete_prediction(

    prediction_id: int,

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_user)

):

    return history_service.delete_prediction(
        db,
        prediction_id,
        current_user.id
    )