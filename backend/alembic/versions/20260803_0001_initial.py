"""Create the contact submissions table.

This first revision intentionally uses PostgreSQL IF NOT EXISTS statements. The
original application created this table with SQLAlchemy on startup before
Alembic was introduced. Keeping the migration tolerant of that legacy table
allows an existing production database to be adopted without manual stamping
or data loss.
"""

from alembic import op

revision = "20260803_0001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.execute(
        """
        CREATE TABLE IF NOT EXISTS contact_submissions (
            id SERIAL NOT NULL,
            name VARCHAR(120) NOT NULL,
            email VARCHAR(320) NOT NULL,
            company VARCHAR(160),
            message TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
            PRIMARY KEY (id)
        )
        """
    )
    op.execute(
        "CREATE INDEX IF NOT EXISTS ix_contact_submissions_email "
        "ON contact_submissions (email)"
    )


def downgrade() -> None:
    op.execute("DROP INDEX IF EXISTS ix_contact_submissions_email")
    op.execute("DROP TABLE IF EXISTS contact_submissions")