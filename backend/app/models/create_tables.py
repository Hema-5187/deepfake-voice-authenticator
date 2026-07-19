from app.models.database import (
    Base,
    engine
)

from app.models.user import User
from app.models.audio_file import AudioFile

Base.metadata.create_all(
    bind=engine
)

print("Tables Created")