from sqlalchemy.orm import Session

from fastapi import HTTPException

from app.models.audio_file import AudioFile


class HistoryService:

    def get_history(
        self,
        db: Session,
        user_id: int
    ):

        history = (
            db.query(AudioFile)
            .filter(AudioFile.user_id == user_id)
            .order_by(AudioFile.created_at.desc())
            .all()
        )

        result = []

        for item in history:

            result.append({

                "id": item.id,

                "filename": item.filename,

                "prediction": item.prediction,

                "probability": item.probability,

                "confidence": item.confidence,

                "processing_time_ms": item.processing_time_ms,

                "model_name": item.model_name,

                "created_at": item.created_at

            })

        return result

    def delete_prediction(
        self,
        db: Session,
        prediction_id: int,
        user_id: int
    ):

        prediction = (
            db.query(AudioFile)
            .filter(AudioFile.id == prediction_id,
                    AudioFile.user_id == user_id
                    )
            .first()
        )

        if prediction is None:

            raise HTTPException(
                status_code=404,
                detail="Prediction not found."
            )

        if prediction.user_id != user_id:

            raise HTTPException(
                status_code=403,
                detail="You are not allowed to delete this prediction."
            )

        db.delete(prediction)

        db.commit()

        return {
            "message": "Prediction deleted successfully."
        }


history_service = HistoryService()