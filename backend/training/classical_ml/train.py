import joblib
import pandas as pd

from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import StandardScaler

from sklearn.model_selection import train_test_split

from sklearn.metrics import accuracy_score

from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC

from config import *

print("=" * 60)
print("Dataset Path")
print(DATASET_PATH)
print()

print("File Exists :", DATASET_PATH.exists())
print("=" * 60)


df = pd.read_csv(DATASET_PATH)

print(df.head())
print()

print("Dataset Shape :", df.shape)

print()

# -----------------------------
# Features and Labels
# -----------------------------

X = df.drop(columns=["LABEL"])

y = df["LABEL"]

# -----------------------------
# Encode Labels
# -----------------------------

encoder = LabelEncoder()

y = encoder.fit_transform(y)

print("Classes :", encoder.classes_)

# -----------------------------
# Train Test Split
# -----------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=TEST_SIZE,
    random_state=RANDOM_STATE,
    stratify=y,
)

print()

print("Training Samples :", len(X_train))

print("Testing Samples :", len(X_test))

# -----------------------------
# Feature Scaling
# -----------------------------

scaler = StandardScaler()

X_train = scaler.fit_transform(X_train)

X_test = scaler.transform(X_test)

# -----------------------------
# Models
# -----------------------------

models = {

    "Logistic Regression": LogisticRegression(max_iter=500),

    "Random Forest": RandomForestClassifier(
        n_estimators=200,
        random_state=RANDOM_STATE
    ),

    "Support Vector Machine": SVC(probability=True)

}

best_model = None

best_accuracy = 0

best_name = ""

print()

print("=" * 60)
print("Training Models")
print("=" * 60)

for name, model in models.items():

    print(f"\nTraining {name}...")

    model.fit(X_train, y_train)

    predictions = model.predict(X_test)

    accuracy = accuracy_score(y_test, predictions)

    print(f"Accuracy : {accuracy:.4f}")

    if accuracy > best_accuracy:

        best_accuracy = accuracy

        best_model = model

        best_name = name

print()

print("=" * 60)
print("Best Model")
print("=" * 60)

print(best_name)

print("Accuracy :", best_accuracy)

# -----------------------------
# Save Model
# -----------------------------

joblib.dump(
    {
        "model": best_model,
        "scaler": scaler,
        "encoder": encoder,
        "features": list(X.columns),
    },
    MODEL_PATH,
)

print()

print("Model Saved Successfully")

print(MODEL_PATH)