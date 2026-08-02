from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.limiter import limiter
from app.db.session import get_session
from app.repositories.contact import ContactRepository
from app.schemas.contact import ContactCreate, ContactResponse
from app.services.email import send_contact_email

router = APIRouter()


@router.post("/contact", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
@limiter.limit(settings.rate_limit)
async def create_contact(
    request: Request,
    data: ContactCreate,
    session: AsyncSession = Depends(get_session),
):
    try:
        await ContactRepository().create(session, data)
        try:
            send_contact_email(data.name, str(data.email), data.company, data.message)
        except Exception:
            # Email delivery must never break the contact submission flow.
            pass
        return {"message": "Your message has been received."}
    except Exception as exc:
        await session.rollback()
        raise HTTPException(status_code=500, detail="Unable to process your message") from exc