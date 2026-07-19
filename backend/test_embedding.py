from app.ml.feature_extractor import feature_extractor

embedding = feature_extractor.extract_embedding(
    "uploads/maybe-next-time.wav"
)

print("\nEmbedding Shape :", embedding.shape)

print("\nFirst 20 Values:\n")

print(embedding[:20])