from pathlib import Path
from typing import Any

import requests
from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.config import (
    INFERENCE_API_URL,
    INFERENCE_TIMEOUT,
)
from app.logger import logger
from app.models.audio_file import AudioFile


class AnalysisService:
    """
    Handles audio analysis by calling the external
    Deepfake Voice Inference API.
    """

    def analyze_audio(
        self,
        file_path: str | Path,
        original_filename: str,
        db: Session,
        user_id: int,
    ) -> dict[str, Any]:
        """
        Sends an uploaded audio file to the inference service,
        stores the prediction in PostgreSQL,
        and returns the analysis result.
        """

        try:

            logger.info("Sending audio to Deepfake Voice Inference API")
            logger.info(f"Processing file: {original_filename}")

            with open(file_path, "rb") as audio:

                response = requests.post(
                    INFERENCE_API_URL,
                    files={
                        "file": (
                            original_filename,
                            audio,
                            "audio/wav",
                        )
                    },
                    timeout=INFERENCE_TIMEOUT,
                )

            logger.info(
                f"Inference API responded with HTTP {response.status_code}"
            )

            if response.status_code != 200:
                logger.warning(
                    f"Inference API returned HTTP {response.status_code}"
                )
                logger.error(response.text)

            response.raise_for_status()

            try:
                result = response.json()
            except ValueError:
                logger.exception(
                    "Inference API returned an invalid JSON response."
                )
                raise HTTPException(
                    status_code=500,
                    detail="Invalid response received from the inference service.",
                )

            logger.info(
                f"Prediction: {result['prediction']} | "
                f"Probability: {result['probability']} | "
                f"Confidence: {result['confidence']}"
            )

            audio_record = AudioFile(
                user_id=user_id,
                filename=original_filename,
                filepath=str(file_path),
                prediction=result["prediction"],
                probability=result["probability"],
                confidence=result["confidence"],
                processing_time_ms=result["processing_time_ms"],
                model_name=result["model"],
            )

            db.add(audio_record)
            db.commit()
            db.refresh(audio_record)

            logger.info(
                f"Prediction stored successfully | "
                f"Audio ID={audio_record.id} | "
                f"Filename={audio_record.filename} | "
                f"User ID={user_id}"
            )

            logger.info(
                f"Returning analysis result for '{original_filename}'."
            )

            return {
                "id": audio_record.id,
                "filename": audio_record.filename,
                "prediction": audio_record.prediction,
                "probability": audio_record.probability,
                "confidence": audio_record.confidence,
                "processing_time_ms": audio_record.processing_time_ms,
                "message": result["message"],
                "model": result["model"],
                "model_version": result["model_version"],
                "accuracy": result["accuracy"],
                "feature_type": result["feature_type"],
                "embedding_size": result["embedding_size"],
                "audio_statistics": result["audio_statistics"],
                "performance": result["performance"],
            }

        except requests.exceptions.HTTPError:
            logger.exception(
                "Inference service returned an HTTP error."
            )

            raise HTTPException(
                status_code=500,
                detail="The inference service returned an unexpected response.",
            )

        except requests.exceptions.RequestException:
            logger.exception(
                "Failed to establish a connection with the inference service."
            )

            raise HTTPException(
                status_code=503,
                detail="Unable to connect to the inference service.",
            )

        except HTTPException:
            raise

        except Exception as e:
            db.rollback()

            logger.exception(
                f"Unexpected error while processing '{original_filename}'."
            )

            raise HTTPException(
                status_code=500,
                detail=f"Analysis failed: {str(e)}",
            )


analysis_service = AnalysisService()