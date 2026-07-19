from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    ForeignKey,
    DateTime
)

from sqlalchemy.sql import func

from app.models.database import Base


class AudioFile(Base):

    __tablename__ = "audio_files"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    filename = Column(
        String,
        nullable=False
    )

    filepath = Column(
        String,
        nullable=False
    )

    # ---------- AI Prediction ----------

    prediction = Column(
        String,
        nullable=True
    )

    probability = Column(
        Float,
        nullable=True
    )

    confidence = Column(
        String,
        nullable=True
    )

    processing_time_ms = Column(
        Float,
        nullable=True
    )

    model_name = Column(
        String,
        default="Support Vector Machine"
    )

    # ---------- Metadata ----------

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )