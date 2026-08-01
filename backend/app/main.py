from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address
from app.api.v1.contact import router as contact_router
from app.core.config import settings
from app.models.contact import Base
from app.db.session import engine
@asynccontextmanager
async def lifespan(_: FastAPI):
    async with engine.begin() as conn: await conn.run_sync(Base.metadata.create_all)
    yield
limiter=Limiter(key_func=get_remote_address)
app=FastAPI(title="Pomvix API", version="1.0.0", docs_url="/docs", lifespan=lifespan)
app.state.limiter=limiter; app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(CORSMiddleware, allow_origins=[settings.frontend_url], allow_credentials=True, allow_methods=["POST"], allow_headers=["*"])
app.include_router(contact_router, prefix="/api/v1")
@app.get("/health")
async def health(): return {"status":"ok"}