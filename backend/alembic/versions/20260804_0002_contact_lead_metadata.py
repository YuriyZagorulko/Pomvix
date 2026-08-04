"""Add useful optional contact details and attribution metadata."""

from alembic import op


revision = "20260804_0002"
down_revision = "20260803_0001"
branch_labels = None
depends_on = None


def upgrade() -> None:
    columns = {
        "website": "VARCHAR(2048)",
        "linkedin": "VARCHAR(2048)",
        "landing_page_url": "VARCHAR(2048)",
        "referrer": "VARCHAR(2048)",
        "utm_source": "VARCHAR(200)",
        "utm_medium": "VARCHAR(200)",
        "utm_campaign": "VARCHAR(200)",
        "utm_content": "VARCHAR(200)",
        "utm_term": "VARCHAR(200)",
    }
    for name, definition in columns.items():
        op.execute(f"ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS {name} {definition}")


def downgrade() -> None:
    for name in (
        "website",
        "linkedin",
        "landing_page_url",
        "referrer",
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_content",
        "utm_term",
    ):
        op.execute(f"ALTER TABLE contact_submissions DROP COLUMN IF EXISTS {name}")