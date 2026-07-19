from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.models.database import get_db
from app.models.user import User
from app.dependencies import get_current_user

from app.services.dashboard_service import dashboard_service

router = APIRouter()


@router.get("/stats")
def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return dashboard_service.get_dashboard_stats(
        db,
        current_user.id
    )