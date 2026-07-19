from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.health import router as health_router
from app.api.auth import router as auth_router
from app.api.audio import router as audio_router
from app.api.analysis import router as analysis_router
from app.api.history import router as history_router
from app.api.dashboard import router as dashboard_router
from app.api.profile import router as profile_router


app = FastAPI(
    title="Deepfake Voice Authenticator"
)

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

app.include_router(
    health_router,
    prefix="/health",
    tags=["Health"]
)

app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Auth"]
)

app.include_router(
    profile_router,
    prefix="/profile",
    tags=["Profile"]
)

app.include_router(
    audio_router,
    prefix="/audio",
    tags=["Audio"]
)

app.include_router(
    analysis_router,
    prefix="/analysis",
    tags=["AI Analysis"]
)

app.include_router(
    history_router,
    prefix="/history",
    tags=["History"]
)

app.include_router(
    dashboard_router,
    prefix="/dashboard",
    tags=["Dashboard"]
)