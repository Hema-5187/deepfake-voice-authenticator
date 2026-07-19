import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
)

from training.classical_ml.config import *

print("=" * 60)
print("Loading Dataset")
print("=" * 60)

df = pd.read_csv(DATASET_PATH)

X = df.drop(columns=["LABEL"])
y = df["LABEL"]

saved = joblib.load(MODEL_PATH)

model = saved["model"]
scaler = saved["scaler"]
encoder = saved["encoder"]

y = encoder.transform(y)

# SAME split used during training
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=TEST_SIZE,
    random_state=RANDOM_STATE,
    stratify=y,
)

X_test = scaler.transform(X_test)

predictions = model.predict(X_test)

print("\nAccuracy")
print(accuracy_score(y_test, predictions))

print("\nClassification Report")
print(classification_report(y_test, predictions))

print("\nConfusion Matrix")
print(confusion_matrix(y_test, predictions))