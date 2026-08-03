import smtplib
import logging
from email.message import EmailMessage

from app.core.config import settings

logger = logging.getLogger(__name__)


class EmailDeliveryError(RuntimeError):
    """Raised when a contact notification cannot be delivered."""


def send_contact_email(name: str, email: str, company: str | None, message: str) -> None:
    """Send a contact-form notification email."""
    if not settings.smtp_host:
        logger.error("Contact email delivery unavailable", extra={"event": "smtp_not_configured"})
        raise EmailDeliveryError("SMTP is not configured")

    mail = EmailMessage()
    mail["Subject"] = f"New Pomvix inquiry from {name}"
    mail["From"], mail["To"] = settings.email_from, settings.email_to
    mail.set_content(f"Name: {name}\nEmail: {email}\nCompany: {company or '-'}\n\n{message}")

    try:
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=15) as server:
            if settings.smtp_use_tls:
                server.starttls()
            server.login(settings.smtp_username, settings.smtp_password)
            server.send_message(mail)
    except (OSError, smtplib.SMTPException) as exc:
        logger.exception(
            "Contact email delivery failed",
            extra={"event": "contact_email_delivery_failed", "smtp_host": settings.smtp_host},
        )
        raise EmailDeliveryError("Contact notification could not be delivered") from exc