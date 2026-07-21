from dotenv import load_dotenv
import os
from pathlib import Path

# ==========================================
# Load Environment Variables
# ==========================================

load_dotenv()

# ==========================================
# Application Settings
# ==========================================

DEBUG = os.getenv("DEBUG", "False").lower() == "true"

SECRET_KEY = os.getenv("SECRET_KEY")

DATABASE_URL = os.getenv("DATABASE_URL")

# ==========================================
# Inference API
# ==========================================

INFERENCE_API_URL = os.getenv("INFERENCE_API_URL")

# Request timeout (seconds)
INFERENCE_TIMEOUT = int(os.getenv("INFERENCE_TIMEOUT", "60"))

# ==========================================
# Base Directories
# ==========================================

BASE_DIR = Path(__file__).resolve().parent.parent

DATASET_DIR = BASE_DIR / "datasets"

RAW_DATASET_DIR = DATASET_DIR / "raw"
PROCESSED_DATASET_DIR = DATASET_DIR / "processed"
SPECTROGRAM_DIR = DATASET_DIR / "spectrograms"
METADATA_DIR = DATASET_DIR / "metadata"

# Training folders
EMBEDDING_DIR = BASE_DIR / "embeddings"
MODEL_DIR = BASE_DIR / "models"

UPLOAD_DIR = BASE_DIR / "uploads"

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
    ".flac",
]

# Maximum upload size (10 MB)
MAX_UPLOAD_SIZE = 10 * 1024 * 1024

# ==========================================
# Wav2Vec2
# ==========================================

WAV2VEC2_MODEL = "facebook/wav2vec2-large-960h-lv60-self"

# ==========================================
# Machine Learning
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