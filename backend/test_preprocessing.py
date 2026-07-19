from app.ml.preprocessing import audio_preprocessor

waveform, sample_rate = audio_preprocessor.preprocess(
    "uploads/maybe-next-time.wav"
)

print("Sample Rate :", sample_rate)

print("Number of Samples :", len(waveform))

print("Duration :", len(waveform) / sample_rate)

print("Min :", waveform.min())

print("Max :", waveform.max())