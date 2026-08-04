import logging

from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.limiter import limiter
from app.db.session import get_session
from app.repositories.contact import ContactRepository
from app.schemas.contact import ContactCreate, ContactResponse
from app.services.email import EmailDeliveryError, send_contact_email

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/contact", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
@limiter.limit(settings.rate_limit)
async def create_contact(
    request: Request,
    data: ContactCreate,
    session: AsyncSession = Depends(get_session),
):
    try:
        submission = await ContactRepository().create(session, data)
        try:
            send_contact_email(data, submitted_at=submission.created_at)
        except EmailDeliveryError:
            # Persistence succeeds independently; delivery can be retried/alerted later.
            logger.warning(
                "Contact submission persisted but notification is pending",
                extra={"event": "contact_email_pending"},
            )
            return JSONResponse(
                status_code=status.HTTP_202_ACCEPTED,
                content={"message": "Your message was received; email notification is pending."},
            )
        return {"message": "Your message has been received."}
    except Exception as exc:
        await session.rollback()
        raise HTTPException(status_code=500, detail="Unable to process your message") from exc