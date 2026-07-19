from app.ml.inference import inference_engine

audio_path = "uploads/maybe-next-time.wav"

result = inference_engine.predict(audio_path)

print("\nPrediction Result\n")
print(result)