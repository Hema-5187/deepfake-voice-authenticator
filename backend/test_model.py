from app.ml.model_loader import model_loader

print(model_loader.device)

print(model_loader.model.config.hidden_size)