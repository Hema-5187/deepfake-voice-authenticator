![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

📖 Overview

Deepfake Voice Authenticator is a production-ready AI-powered web application designed to distinguish between genuine human voices and AI-generated speech.

The application leverages Wav2Vec2 embeddings combined with a Support Vector Machine (SVM) classifier to analyze uploaded or recorded audio and determine whether it is Real or Fake. Users receive confidence scores, probability estimates, and detailed analytics through an intuitive dashboard.

The platform also includes secure JWT authentication, prediction history, profile management, PDF report generation, and interactive visualizations, making it suitable for demonstrating AI-powered cybersecurity and multimedia forensics concepts.

✨ Features

🔐 Secure User Authentication (JWT)
🎙 Upload Audio Files
🎤 Live Voice Recording
🤖 AI-Powered Deepfake Detection
📊 Confidence & Probability Analysis
📈 Interactive Dashboard
📜 Prediction History
📄 PDF Report Generation
👤 User Profile Management
📱 Responsive Modern UI
⚡ FastAPI REST API
🗄 PostgreSQL Database
🎨 Beautiful React Frontend
🧠 AI Model


The detection pipeline consists of:

Feature Extractor: Facebook Wav2Vec2
Embedding Size: 768
Classifier: Support Vector Machine (SVM)
Framework: PyTorch + Transformers
Audio Processing: Librosa
Detection Output
Prediction (Real / Fake)
Probability Score
Confidence Level
Processing Time
Model Version
🛠 Tech Stack
Frontend
React 19
Vite
Tailwind CSS
Axios
React Router
Recharts
Framer Motion
React Hot Toast
jsPDF
WaveSurfer.js
Backend
FastAPI
SQLAlchemy
PostgreSQL
JWT Authentication
Pydantic
Uvicorn
Alembic
Machine Learning
PyTorch
Transformers
Wav2Vec2
Scikit-learn
NumPy
Pandas
Librosa
📂 Project Structure
deepfake-voice-authenticator
│
├── backend
│   ├── app
│   ├── training
│   │   └── models
│   │       └── deepfake_model.pkl
│   ├── uploads
│   ├── requirements.txt
│   └── .env
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md


🚀 Installation

Kaggle dataset  https://www.kaggle.com/datasets/adarshsingh0903/audio-deepfake-detection-dataset

Clone Repository
git clone https://github.com/Hema-5187/deepfake-voice-authenticator.git

cd deepfake-voice-authenticator
Backend Setup
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate

Install dependencies

pip install -r requirements.txt

Create .env

DATABASE_URL=

SECRET_KEY=

REDIS_URL=

DEBUG=True

MODEL_NAME=facebook/wav2vec2-base

MODEL_CACHE=./model_cache

MAX_AUDIO_DURATION=30

MIN_AUDIO_DURATION=1

Run Backend

uvicorn app.main:app --reload

Backend URL

http://localhost:8000


Swagger

http://localhost:8000/docs


Frontend Setup
cd frontend

npm install

npm run dev


Frontend URL

http://localhost:5173


📊 Workflow
User
   │
   ▼
Upload / Record Audio
   │
   ▼
Audio Preprocessing
   │
   ▼
Wav2Vec2 Feature Extraction
   │
   ▼
SVM Classification
   │
   ▼
Prediction Result
   │
   ▼
Save to PostgreSQL
   │
   ▼
Dashboard & History


🔐 Authentication
User Registration
Secure Login
JWT Access Token
Protected API Endpoints
Profile Management


📈 Dashboard

The application dashboard provides:

Total Predictions
Real Voice Count
Fake Voice Count
Detection Distribution
Prediction Trends
Recent Activity
User Statistics


📄 PDF Reports

Users can generate professional PDF reports containing:

User Information
Prediction Summary
Detection Statistics
Complete History
AI Model Details


📷 Screenshots

Add screenshots after deployment.

screenshots/

login.png

dashboard.png

prediction.png

history.png

profile.png


🌍 Future Improvements
Real-time Streaming Detection
Voice Biometrics
Multi-language Detection
Explainable AI (XAI)
Cloud Storage
Docker Deployment
CI/CD Pipeline
Role-Based Access Control


🤝 Contributing

Contributions are welcome.

Fork the repository
Create a new branch
git checkout -b feature-name
Commit changes
git commit -m "Add new feature"
Push
git push origin feature-name
Open a Pull Request



## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

👩‍💻 Author

Hema Maurya

GitHub: https://github.com/Hema-5187

LinkedIn: https://www.linkedin.com/in/hema-maurya-570920358

⭐ Support

If you found this project helpful, please consider giving it a ⭐ Star on GitHub. It helps others discover the project and motivates further development.