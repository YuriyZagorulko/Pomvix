import os
import asyncio
import inspect
import unittest
from unittest.mock import AsyncMock, patch

os.environ.setdefault("SECRET_KEY", "test-secret-key-that-is-long-enough-123")
os.environ.setdefault("DATABASE_URL", "postgresql+asyncpg://user:pass@db/app")
os.environ.setdefault("FRONTEND_URL", "http://localhost:3000")
os.environ.setdefault("EMAIL_FROM", "hello@pomvix.com")
os.environ.setdefault("EMAIL_TO", "hello@pomvix.com")

from app.api.v1.contact import create_contact
from app.schemas.contact import ContactCreate
from app.services.email import EmailDeliveryError, send_contact_email


class ContactEmailTests(unittest.TestCase):
    @patch("app.services.email.smtplib.SMTP", side_effect=OSError("connection refused"))
    def test_smtp_failure_is_raised(self, smtp):
        with self.assertRaises(EmailDeliveryError):
            send_contact_email("Test User", "user@example.com", None, "A valid message")

    @patch("app.api.v1.contact.send_contact_email", side_effect=EmailDeliveryError("failed"))
    @patch("app.api.v1.contact.ContactRepository.create", new_callable=AsyncMock)
    def test_api_preserves_persistence_when_email_fails(self, create, send):
        class Session:
            rollback = AsyncMock()

        handler = inspect.unwrap(create_contact)
        response = asyncio.run(
            handler(
                object(),
                ContactCreate(name="Test User", email="user@example.com", message="A valid message"),
                Session(),
            )
        )
        self.assertEqual(response.status_code, 202)
        create.assert_awaited_once()
        send.assert_called_once()


class ReadinessTests(unittest.TestCase):
    def test_migration_is_the_schema_source(self):
        with open("backend/app/main.py", encoding="utf-8") as source:
            self.assertNotIn("create_" + "all", source.read())
        with open("backend/alembic/versions/001_create_contact_submissions.py", encoding="utf-8") as migration:
            content = migration.read()
        self.assertIn('revision = "001_create_contact_submissions"', content)
        self.assertIn('op.create_table(', content)

    def test_invalid_production_configuration_fails_fast(self):
        from app.core.config import Settings

        with self.assertRaises(ValueError):
            Settings(
                environment="production",
                secret_key="test-secret-key-that-is-long-enough-123",
                database_url="postgresql+asyncpg://user:pass@db/app",
                frontend_url="https://pomvix.com",
                email_from="hello@pomvix.com",
                email_to="",
            )


if __name__ == "__main__":
    unittest.main()