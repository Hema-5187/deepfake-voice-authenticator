import joblib
import numpy as np

from pathlib import Path

from sklearn.model_selection import (
    train_test_split,
    StratifiedKFold,
    cross_val_score
)

from sklearn.preprocessing import StandardScaler

from sklearn.pipeline import Pipeline

from sklearn.svm import SVC

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
    classification_report
)

from config import (
    X_FILE,
    Y_FILE,
    MODEL_FILE,
    RANDOM_STATE,
    TEST_SIZE,
    MODEL_NAME,
    MODEL_VERSION,
    FEATURE_TYPE,
    EMBEDDING_SIZE,
    SVM_KERNEL,
    SVM_C,
    SVM_GAMMA,
    SVM_PROBABILITY
)


def main():

    print("=" * 60)
    print("Loading Embeddings")
    print("=" * 60)

    X = np.load(X_FILE)
    y = np.load(Y_FILE)

    print(f"Samples     : {len(X)}")
    print(f"Dimensions  : {X.shape[1]}")

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=TEST_SIZE,
        random_state=RANDOM_STATE,
        stratify=y
    )

    print("\nTraining Samples :", len(X_train))
    print("Testing Samples  :", len(X_test))

    scaler = StandardScaler()

    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    model = SVC(
        kernel=SVM_KERNEL,
        C=SVM_C,
        gamma=SVM_GAMMA,
        probability=SVM_PROBABILITY,
        random_state=RANDOM_STATE
    )

    print("\nTraining SVM...")
    model.fit(X_train_scaled, y_train)

    predictions = model.predict(X_test_scaled)

    accuracy = accuracy_score(y_test, predictions)
    precision = precision_score(y_test, predictions)
    recall = recall_score(y_test, predictions)
    f1 = f1_score(y_test, predictions)

    print("\nPerforming 5-Fold Cross Validation...")

    pipeline = Pipeline([
        ("scaler", StandardScaler()),
        ("svm", SVC(
            kernel=SVM_KERNEL,
            C=SVM_C,
            gamma=SVM_GAMMA,
            probability=SVM_PROBABILITY
        ))
    ])

    cv = StratifiedKFold(
        n_splits=5,
        shuffle=True,
        random_state=RANDOM_STATE
    )

    cv_scores = cross_val_score(
        pipeline,
        X,
        y,
        cv=cv,
        scoring="accuracy"
    )

    print("\n")
    print("=" * 60)
    print("MODEL REPORT")
    print("=" * 60)

    print(f"Accuracy     : {accuracy:.4f}")
    print(f"Precision    : {precision:.4f}")
    print(f"Recall       : {recall:.4f}")
    print(f"F1 Score     : {f1:.4f}")

    print(f"\nCross Validation Mean : {cv_scores.mean():.4f}")
    print(f"Cross Validation Std  : {cv_scores.std():.4f}")

    print("\nConfusion Matrix")

    print(confusion_matrix(y_test, predictions))

    print("\nClassification Report")

    print(classification_report(y_test, predictions))

    MODEL_FILE.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    joblib.dump(
        {
            "model": model,
            "scaler": scaler,
            "model_name": MODEL_NAME,
            "accuracy": accuracy,
            "version": MODEL_VERSION,
            "feature_type": FEATURE_TYPE,
            "embedding_size": EMBEDDING_SIZE
        },
        MODEL_FILE
    )

    print("\n")
    print("=" * 60)
    print("Model Saved Successfully")
    print(MODEL_FILE)
    print("=" * 60)


if __name__ == "__main__":
    main()