from pathlib import Path
from typing import Any

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.ml.inference import inference_engine
from app.models.audio_file import AudioFile


class AnalysisService:
    """
    Handles audio analysis and persistence.

    Responsibilities:
    - Run ML inference
    - Save prediction metadata
    - Return API response
    """

    def analyze_audio(
        self,
        file_path: str | Path,
        original_filename: str,
        db: Session,
        user_id: int
    ) -> dict[str, Any]:

        try:
            # ===============================
            # AI Prediction
            # ===============================

            result = inference_engine.predict(file_path)

            # ===============================
            # Save Prediction Metadata
            # ===============================

            audio = AudioFile(
                user_id=user_id,
                filename=original_filename,
                filepath="",
                prediction=result["prediction"],
                probability=result["probability"],
                confidence=result["confidence"],
                processing_time_ms=result["processing_time_ms"],
                model_name=result["model"]
            )

            db.add(audio)
            db.commit()
            db.refresh(audio)

            return {
    "id": audio.id,
    "filename": audio.filename,
    "prediction": audio.prediction,
    "probability": audio.probability,
    "confidence": audio.confidence,
    "processing_time_ms": audio.processing_time_ms,
    "message": result["message"],
    "model": result["model"],
    "model_version": result["model_version"],
    "accuracy": result["accuracy"],
    "feature_type": result["feature_type"],
    "embedding_size": result["embedding_size"],
    "audio_statistics": result["audio_statistics"],
    "performance": result["performance"]
}

        except HTTPException:
            raise

        except ValueError as e:
            raise HTTPException(
                status_code=400,
                detail=str(e)
            )

        except Exception as e:
            db.rollback()

            raise HTTPException(
                status_code=500,
                detail=f"Analysis failed: {str(e)}"
            )


analysis_service = AnalysisService()