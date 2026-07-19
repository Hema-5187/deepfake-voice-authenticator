from pathlib import Path
import joblib
import numpy as np

from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

from sklearn.model_selection import train_test_split

BASE_DIR = Path(__file__).resolve().parents[2]

X = np.load(BASE_DIR / "training" / "embeddings" / "X.npy")
y = np.load(BASE_DIR / "training" / "embeddings" / "y.npy")

saved = joblib.load(
    BASE_DIR / "training" / "models" / "embedding_model.pkl"
)

model = saved["model"]
scaler = saved["scaler"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

X_test = scaler.transform(X_test)

predictions = model.predict(X_test)

print("=" * 60)
print("Accuracy")
print("=" * 60)
print(accuracy_score(y_test, predictions))

print("\nClassification Report")
print(classification_report(y_test, predictions))

print("\nConfusion Matrix")
print(confusion_matrix(y_test, predictions))