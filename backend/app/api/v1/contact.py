from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.ext.asyncio import AsyncSession
from slowapi import Limiter
from slowapi.util import get_remote_address
from app.db.session import get_session
from app.repositories.contact import ContactRepository
from app.schemas.contact import ContactCreate, ContactResponse
from app.services.email import send_contact_email
router=APIRouter()
limiter = Limiter(key_func=get_remote_address)
@router.post("/contact", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
async def create_contact(request: Request, data: ContactCreate, session: AsyncSession = Depends(get_session)):
    try:
        await ContactRepository().create(session, data)
        try: send_contact_email(data.name, str(data.email), data.company, data.message)
        except Exception: pass
        return {"message":"Your message has been received."}
    except Exception as exc:
        await session.rollback()
        raise HTTPException(status_code=500, detail="Unable to process your message") from exc