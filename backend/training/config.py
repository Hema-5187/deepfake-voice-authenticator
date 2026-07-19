from pathlib import Path

# ======================================================
# Base Directories
# ======================================================

ROOT_DIR = Path(__file__).resolve().parent

EMBEDDING_DIR = ROOT_DIR / "embeddings"

MODEL_DIR = ROOT_DIR / "models"

CLASSICAL_ML_DIR = ROOT_DIR / "classical_ml"

# ======================================================
# Embedding Files
# ======================================================

X_FILE = EMBEDDING_DIR / "X.npy"

Y_FILE = EMBEDDING_DIR / "y.npy"

# ======================================================
# Saved Model
# ======================================================

MODEL_FILE = MODEL_DIR / "embedding_model.pkl"

# ======================================================
# Training Parameters
# ======================================================

TEST_SIZE = 0.20

RANDOM_STATE = 42

# ======================================================
# SVM Parameters
# ======================================================

SVM_KERNEL = "rbf"

SVM_C = 10

SVM_GAMMA = "scale"

SVM_PROBABILITY = True

# ======================================================
# Model Metadata
# ======================================================

MODEL_NAME = "Wav2Vec2 + SVM"

MODEL_VERSION = "2.0"

FEATURE_TYPE = "Wav2Vec2 Embedding"

EMBEDDING_SIZE = 768