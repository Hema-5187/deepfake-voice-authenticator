from pathlib import Path
import numpy as np
from tqdm import tqdm
import sys

BACKEND_DIR = Path(__file__).resolve().parents[2]
sys.path.append(str(BACKEND_DIR))

from app.ml.feature_extractor import feature_extractor

DATASET_DIR = (
    BACKEND_DIR
    / "training"
    / "datasets"
    / "source"
    / "deepfake"
)

REAL_DIR = DATASET_DIR / "real_samples"

FAKE_DIRS = [
    "FlashSpeech",
    "NaturalSpeech3",
    "OpenAI",
    "PromptTTS2",
    "seedtts_files",
    "VALLE",
    "VoiceBox",
    "xTTS"
]

embeddings = []
labels = []

print("\nGenerating REAL embeddings...\n")

for audio in tqdm(REAL_DIR.rglob("*.wav")):

    embedding = feature_extractor.extract_embedding(str(audio))

    embeddings.append(embedding)

    labels.append(0)


print("\nGenerating FAKE embeddings...\n")

for folder in FAKE_DIRS:

    current = DATASET_DIR / folder

    for audio in tqdm(current.rglob("*.wav")):

        embedding = feature_extractor.extract_embedding(str(audio))

        embeddings.append(embedding)

        labels.append(1)


embeddings = np.array(embeddings)

labels = np.array(labels)

SAVE_DIR = BACKEND_DIR / "training" / "embeddings"

SAVE_DIR.mkdir(
    parents=True,
    exist_ok=True
)

np.save(
    SAVE_DIR / "X.npy",
    embeddings
)

np.save(
    SAVE_DIR / "y.npy",
    labels
)

print("\n=================================")
print("Embedding Generation Complete")
print("=================================")
print("Embeddings Shape :", embeddings.shape)
print("Labels Shape :", labels.shape)