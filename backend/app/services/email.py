import smtplib
from email.message import EmailMessage

from app.core.config import settings


def send_contact_email(name: str, email: str, company: str | None, message: str) -> None:
    """Send a contact-form notification email. No-op when SMTP is not configured."""
    if not settings.smtp_host:
        return

    mail = EmailMessage()
    mail["Subject"] = f"New Pomvix inquiry from {name}"
    mail["From"], mail["To"] = settings.email_from, settings.email_to
    mail.set_content(f"Name: {name}\nEmail: {email}\nCompany: {company or '-'}\n\n{message}")

    with smtplib.SMTP(settings.smtp_host, settings.smtp_port) as server:
        if settings.smtp_use_tls:
            server.starttls()
        if settings.smtp_username:
            server.login(settings.smtp_username, settings.smtp_password)
        server.send_message(mail)