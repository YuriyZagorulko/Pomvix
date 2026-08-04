import html
import logging
import smtplib
from datetime import datetime, timezone
from email.message import EmailMessage

from app.core.config import settings
from app.schemas.contact import ContactCreate

logger = logging.getLogger(__name__)


class EmailDeliveryError(RuntimeError):
    """Raised when a contact notification cannot be delivered."""


def _value(value: str | None) -> str:
    return html.escape(value.strip()) if value and value.strip() else "Not provided"


def _field(label: str, value: str | None, link: bool = False) -> str:
    display = _value(value)
    if link and value and value.strip():
        safe_url = html.escape(value.strip(), quote=True)
        display = f'<a href="{safe_url}" style="color:#8ee6c1;">{display}</a>'
    return (
        '<tr><td style="padding:10px 0;color:#94a3b8;width:180px;vertical-align:top;">'
        f"{html.escape(label)}</td><td style=\"padding:10px 0;color:#e2e8f0;\">{display}</td></tr>"
    )


def _layout(title: str, body: str) -> str:
    return f"""<!doctype html>
<html><body style="margin:0;background:#0b1020;color:#e2e8f0;font-family:Arial,sans-serif;">
  <div style="max-width:640px;margin:0 auto;padding:40px 24px;">
    <div style="font-size:24px;font-weight:700;color:#8ee6c1;margin-bottom:28px;">Pomvix</div>
    <div style="background:#131b2e;border:1px solid #26334d;border-radius:14px;padding:28px;">
      <h1 style="margin:0 0 18px;color:#f8fafc;font-size:24px;">{title}</h1>
      {body}
    </div>
    <p style="color:#64748b;font-size:12px;margin-top:24px;">Pomvix · Building practical digital products.</p>
  </div>
</body></html>"""


def _confirmation_email(data: ContactCreate) -> EmailMessage:
    body = _layout(
        "We've received your message",
        '<p style="line-height:1.7;margin:0 0 14px;">Thank you for reaching out to Pomvix. We have received your message and our team will review your request.</p>'
        '<p style="line-height:1.7;margin:0 0 14px;">You can typically expect a reply within one business day. If you need to add more information, simply reply directly to this email.</p>'
        '<p style="line-height:1.7;margin:24px 0 0;">Best regards,<br><strong style="color:#f8fafc;">The Pomvix team</strong></p>',
    )
    mail = EmailMessage()
    mail["Subject"] = "We've received your message — Pomvix"
    mail["From"] = settings.email_from
    mail["To"] = str(data.email)
    mail.set_content(
        "Thank you for reaching out to Pomvix. We have received your message and will typically reply within one business day.\n\n"
        "If you need to add more information, simply reply directly to this email.\n\nBest regards,\nThe Pomvix team"
    )
    mail.add_alternative(body, subtype="html")
    return mail


def _internal_email(data: ContactCreate, submitted_at: datetime | None) -> EmailMessage:
    timestamp = submitted_at or datetime.now(timezone.utc)
    if timestamp.tzinfo is None:
        timestamp = timestamp.replace(tzinfo=timezone.utc)
    timestamp_text = timestamp.astimezone(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    fields = "".join(
        (
            _field("Submission date/time", timestamp_text),
            _field("Full Name", data.name),
            _field("Company", data.company),
            _field("Company Website", data.website, link=True),
            _field("LinkedIn Profile", data.linkedin, link=True),
            _field("Email", str(data.email)),
            _field("Landing page URL", data.landing_page_url, link=True),
            _field("Referrer", data.referrer, link=True),
            _field("UTM Source", data.utm_source),
            _field("UTM Medium", data.utm_medium),
            _field("UTM Campaign", data.utm_campaign),
            _field("UTM Content", data.utm_content),
            _field("UTM Term", data.utm_term),
        )
    )
    body = _layout(
        f"New inquiry from {_value(data.name)}",
        f'<table style="width:100%;border-collapse:collapse;">{fields}</table>'
        '<div style="border-top:1px solid #26334d;margin-top:20px;padding-top:20px;">'
        '<div style="color:#94a3b8;margin-bottom:8px;">Project Description</div>'
        f'<div style="white-space:pre-wrap;line-height:1.7;color:#e2e8f0;">{_value(data.message)}</div></div>',
    )
    mail = EmailMessage()
    mail["Subject"] = f"New Pomvix inquiry from {data.name}"
    mail["From"] = settings.email_from
    mail["To"] = settings.email_to
    mail["Reply-To"] = str(data.email)
    mail.set_content(
        f"New Pomvix inquiry from {data.name}\n\nEmail: {data.email}\nCompany: {data.company or 'Not provided'}\n\n{data.message}"
    )
    mail.add_alternative(body, subtype="html")
    return mail


def send_contact_emails(data: ContactCreate, submitted_at: datetime | None = None) -> None:
    """Send the internal notification and visitor confirmation emails."""
    if not settings.smtp_host:
        logger.error("Contact email delivery unavailable", extra={"event": "smtp_not_configured"})
        raise EmailDeliveryError("SMTP is not configured")
    try:
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=15) as server:
            if settings.smtp_use_tls:
                server.starttls()
            if settings.smtp_username:
                server.login(settings.smtp_username, settings.smtp_password)
            server.send_message(_internal_email(data, submitted_at))
            server.send_message(_confirmation_email(data))
    except (OSError, smtplib.SMTPException) as exc:
        logger.exception(
            "Contact email delivery failed",
            extra={"event": "contact_email_delivery_failed", "smtp_host": settings.smtp_host},
        )
        raise EmailDeliveryError("Contact notification could not be delivered") from exc


def send_contact_email(
    name: str | ContactCreate,
    email: str | None = None,
    company: str | None = None,
    message: str | None = None,
    submitted_at: datetime | None = None,
) -> None:
    """Compatibility entry point for the contact email flow."""
    if isinstance(name, ContactCreate):
        send_contact_emails(name, submitted_at)
        return
    if email is None or message is None:
        raise ValueError("email and message are required")
    send_contact_emails(ContactCreate(name=name, email=email, company=company, message=message))