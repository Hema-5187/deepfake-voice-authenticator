from sqlalchemy.orm import Session

from app.models.user import User
from app.models.audio_file import AudioFile


class ProfileService:

    def get_profile(
        self,
        db: Session,
        user: User
    ):

        total_predictions = (
            db.query(AudioFile)
            .filter(
                AudioFile.user_id == user.id,
                AudioFile.prediction.isnot(None)
            )
            .count()
        )

        real_predictions = (
            db.query(AudioFile)
            .filter(
                AudioFile.user_id == user.id,
                AudioFile.prediction == "REAL"
            )
            .count()
        )

        fake_predictions = (
            db.query(AudioFile)
            .filter(
                AudioFile.user_id == user.id,
                AudioFile.prediction == "FAKE"
            )
            .count()
        )

        return {

            "id": user.id,

            "email": user.email,

            "member_since": user.created_at,

            "total_predictions": total_predictions,

            "real_predictions": real_predictions,

            "fake_predictions": fake_predictions

        }


profile_service = ProfileService()