import os
from pathlib import Path

from fastapi import APIRouter
from fastapi import Depends
from fastapi import File
from fastapi import HTTPException
from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.models.database import get_db
from app.services.analysis_service import analysis_service

router = APIRouter()

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@router.post("/upload")
async def upload_audio(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Upload an audio file and run deepfake detection.
    """

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No filename provided."
        )

    allowed_extensions = {
        ".wav",
        ".mp3",
        ".flac",
        ".ogg",
        ".m4a"
    }

    extension = Path(file.filename).suffix.lower()

    if extension not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail=(
                "Unsupported audio format. "
                "Allowed formats: wav, mp3, flac, ogg, m4a."
            )
        )

    temp_path = UPLOAD_DIR / file.filename

    try:

        with open(temp_path, "wb") as buffer:
            buffer.write(await file.read())

        result = analysis_service.analyze_audio(
            file_path=temp_path,
            original_filename=file.filename,
            db=db,
            user_id=1      # Replace with authenticated user later
        )

        return result

    finally:
        if temp_path.exists():
            temp_path.unlink()