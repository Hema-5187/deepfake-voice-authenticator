from dotenv import load_dotenv
import os
from pathlib import Path

load_dotenv()

# ==========================================
# Environment Variables
# ==========================================

DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY")
DEBUG = os.getenv("DEBUG", "False").lower() == "true"

# ==========================================
# Base Directories
# ==========================================

BASE_DIR = Path(__file__).resolve().parent.parent

DATASET_DIR = BASE_DIR / "datasets"

RAW_DATASET_DIR = DATASET_DIR / "raw"
PROCESSED_DATASET_DIR = DATASET_DIR / "processed"
SPECTROGRAM_DIR = DATASET_DIR / "spectrograms"
METADATA_DIR = DATASET_DIR / "metadata"

# New folders for training
EMBEDDING_DIR = BASE_DIR / "embeddings"
MODEL_DIR = BASE_DIR / "models"

# ==========================================
# Dataset Structure
# ==========================================

REAL_AUDIO_DIR = RAW_DATASET_DIR / "real"
FAKE_AUDIO_DIR = RAW_DATASET_DIR / "fake"

# ==========================================
# Audio Settings
# ==========================================

TARGET_SAMPLE_RATE = 16000

MIN_AUDIO_DURATION = 3.0
MAX_AUDIO_DURATION = 15.0

SUPPORTED_AUDIO_FORMATS = [
    ".wav",
    ".mp3",
    ".m4a",
    ".flac"
]

# ==========================================
# Wav2Vec2
# ==========================================

WAV2VEC2_MODEL = "facebook/wav2vec2-large-960h-lv60-self"

# ==========================================
# ML Training
# ==========================================

TEST_SIZE = 0.20
RANDOM_STATE = 42

# ==========================================
# Output Files
# ==========================================

EMBEDDINGS_FILE = EMBEDDING_DIR / "embeddings.npy"
LABELS_FILE = EMBEDDING_DIR / "labels.npy"

CLASSIFIER_FILE = MODEL_DIR / "embedding_model.pkl"
SCALER_FILE = MODEL_DIR / "scaler.pkl"