from sqlalchemy.ext.asyncio import AsyncSession
from app.models.contact import ContactSubmission
from app.schemas.contact import ContactCreate
class ContactRepository:
    async def create(self, session: AsyncSession, data: ContactCreate) -> ContactSubmission:
        submission = ContactSubmission(**data.model_dump())
        session.add(submission)
        await session.commit()
        await session.refresh(submission)
        return submission