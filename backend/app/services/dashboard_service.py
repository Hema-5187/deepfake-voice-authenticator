from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.audio_file import AudioFile


class DashboardService:

    def get_dashboard_stats(
        self,
        db: Session,
        user_id: int
    ):

        total_scans = (
            db.query(AudioFile)
            .filter(
                AudioFile.user_id == user_id,
                AudioFile.prediction.isnot(None)
            )
            .count()
        )

        real_predictions = (
            db.query(AudioFile)
            .filter(
                AudioFile.user_id == user_id,
                AudioFile.prediction == "REAL"
            )
            .count()
        )

        fake_predictions = (
            db.query(AudioFile)
            .filter(
                AudioFile.user_id == user_id,
                AudioFile.prediction == "FAKE"
            )
            .count()
        )

        avg_confidence = (
            db.query(func.avg(AudioFile.probability))
            .filter(AudioFile.user_id == user_id)
            .scalar()
        )

        avg_processing_time = (
            db.query(func.avg(AudioFile.processing_time_ms))
            .filter(AudioFile.user_id == user_id)
            .scalar()
        )

        return {

            "total_scans": total_scans,

            "real_predictions": real_predictions,

            "fake_predictions": fake_predictions,

            "average_confidence": round(
                avg_confidence or 0,
                2
            ),

            "average_processing_time_ms": round(
                avg_processing_time or 0,
                2
            )

        }


dashboard_service = DashboardService()