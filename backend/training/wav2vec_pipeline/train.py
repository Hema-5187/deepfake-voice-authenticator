from pathlib import Path
import joblib

import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score

from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC


BASE_DIR = Path(__file__).resolve().parents[2]

EMBEDDING_DIR = BASE_DIR / "training" / "embeddings"
MODEL_DIR = BASE_DIR / "training" / "models"

MODEL_DIR.mkdir(exist_ok=True)

print("=" * 60)
print("Loading Embeddings")
print("=" * 60)

X = np.load(EMBEDDING_DIR / "X.npy")
y = np.load(EMBEDDING_DIR / "y.npy")

print("Embedding Shape :", X.shape)
print("Labels Shape    :", y.shape)

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

scaler = StandardScaler()

X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

models = {

    "Logistic Regression":
        LogisticRegression(max_iter=1000),

    "Random Forest":
        RandomForestClassifier(
            n_estimators=200,
            random_state=42
        ),

    "Support Vector Machine":
        SVC(
            kernel="rbf",
            probability=True,
            random_state=42
        )
}

best_model = None
best_name = None
best_accuracy = 0

print("\nTraining Models...\n")

for name, model in models.items():

    print(f"Training {name}...")

    model.fit(X_train, y_train)

    predictions = model.predict(X_test)

    accuracy = accuracy_score(
        y_test,
        predictions
    )

    print(f"Accuracy : {accuracy:.4f}\n")

    if accuracy > best_accuracy:

        best_accuracy = accuracy
        best_model = model
        best_name = name


print("=" * 60)
print("Best Model")
print("=" * 60)

print(best_name)
print(best_accuracy)


joblib.dump(
    {
        "model": best_model,
        "scaler": scaler,
        "accuracy": best_accuracy,
        "model_name": best_name,
        "feature_type": "wav2vec2_embedding",
        "embedding_size": 768,
        "version": "2.0"
    },
    MODEL_DIR / "embedding_model.pkl"
)

print("\nModel Saved Successfully")