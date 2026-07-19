from pathlib import Path

# backend folder
BACKEND_DIR = Path(__file__).resolve().parents[2]

DATASET_PATH = BACKEND_DIR / "training" / "datasets" / "source" / "deepvoice" / "DATASET-balanced.csv"

MODEL_DIR = BACKEND_DIR / "training" / "models"
MODEL_DIR.mkdir(exist_ok=True)

MODEL_PATH = MODEL_DIR / "deepfake_model.pkl"

TEST_SIZE = 0.20
RANDOM_STATE = 42