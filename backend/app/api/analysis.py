from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from pathlib import Path

import shutil
import os
import uuid

from app.models.database import get_db
from app.models.user import User

from app.dependencies import get_current_user

from app.services.analysis_service import analysis_service

router = APIRouter()

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

ALLOWED_EXTENSIONS = {

    ".wav",

    ".mp3",

    ".flac",

    ".m4a",

    ".webm",

}

MAX_FILE_SIZE = 25 * 1024 * 1024  # 25 MB


@router.post("/predict")
async def predict_audio(

    file: UploadFile = File(...),

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_user),

):

    # ===================================
    # Validate Filename
    # ===================================

    if not file.filename:

        raise HTTPException(

            status_code=400,

            detail="No file selected."

        )

    extension = Path(file.filename).suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:

        raise HTTPException(

            status_code=400,

            detail="Unsupported audio format. Only WAV, MP3, FLAC and M4A are allowed."

        )

    # ===================================
    # Validate File Size
    # ===================================

    contents = await file.read()

    if len(contents) > MAX_FILE_SIZE:

        raise HTTPException(

            status_code=400,

            detail="Maximum file size is 25 MB."

        )

    await file.seek(0)

    # ===================================
    # Save Temporary File
    # ===================================

    unique_filename = f"{uuid.uuid4()}{extension}"

    file_path = UPLOAD_DIR / unique_filename

    try:

        with open(file_path, "wb") as buffer:

            shutil.copyfileobj(file.file, buffer)

        # ===================================
        # Run AI Prediction
        # ===================================

        result = analysis_service.analyze_audio(

            str(file_path),
            file.filename,
            db,
            current_user.id,

        )

        return result

    except HTTPException:

        raise

    except Exception as e:

        print(e)

        raise HTTPException(

            status_code=500,

            detail="Internal server error while analyzing audio."

        )

    finally:

        # ===================================
        # Delete Temporary Audio
        # ===================================

        if file_path.exists():

            os.remove(file_path)