from app.ml.inference import inference_engine

result = inference_engine.predict(
    "uploads/maybe-next-time.wav"
)

print(result)