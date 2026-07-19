from transformers import Wav2Vec2Processor
from transformers import Wav2Vec2Model

from app.core.config import MODEL_NAME

import torch


class ModelLoader:

    def __init__(self):

        self.device = (
            "cuda"
            if torch.cuda.is_available()
            else "cpu"
        )

        print(f"Loading {MODEL_NAME}...")

        self.processor = Wav2Vec2Processor.from_pretrained(
            MODEL_NAME
        )

        self.model = Wav2Vec2Model.from_pretrained(
            MODEL_NAME
        )

        self.model.to(self.device)

        self.model.eval()

        print("Model Loaded Successfully")


model_loader = ModelLoader()