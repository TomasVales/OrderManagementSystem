from fastapi import FastAPI
from database import Base, engine
from routes import orders, products
from fastapi.middleware.cors import CORSMiddleware
from auth import router as auth_router

# Crear las tablas automáticamente al iniciar
Base.metadata.create_all(bind=engine)

# Crear la app FastAPI
app = FastAPI(
    title="Taste API",
    description="Sistema de pedidos con notificación por WhatsApp",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # o ["*"] para desarrollo rápido
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(products.router)
app.include_router(orders.router)
app.include_router(auth_router)
