from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables.

    All values are environment-driven. No hardcoded hosts, credentials, or
    environment-specific defaults are baked into the application.
    """

    # --- Core -----------------------------------------------------------------
    environment: str = Field(default="development", description="Runtime environment: development | production")
    debug: bool = Field(default=False, description="Enable debug mode (never enable in production)")
    secret_key: str = Field(..., min_length=32, description="Long random secret used for signing/session data")
    database_url: str = Field(..., description="Async SQLAlchemy database URL")

    # --- Frontend / CORS ------------------------------------------------------
    frontend_url: str = Field(..., description="Public frontend origin, e.g. https://pomvix.com")
    cors_origins: str = Field(
        default="",
        description="Comma-separated list of allowed CORS origins. Defaults to FRONTEND_URL when empty.",
    )

    # --- Cookie / session -----------------------------------------------------
    cookie_secure: bool = Field(default=True, description="Send cookies only over HTTPS")

    # --- SMTP ----------------------------------------------------------------
    smtp_host: str = Field(default="", description="SMTP relay host (empty disables email sending)")
    smtp_port: int = Field(default=587, ge=1, le=65535)
    smtp_username: str = Field(default="")
    smtp_password: str = Field(default="")
    smtp_use_tls: bool = Field(default=True, description="Use STARTTLS when connecting to the SMTP server")
    email_from: str = Field(..., description="Sender address for outgoing email")
    email_to: str = Field(..., description="Recipient address for contact-form submissions")

    # --- API behaviour --------------------------------------------------------
    api_v1_prefix: str = Field(default="/api/v1")
    docs_enabled: bool = Field(default=False, description="Expose /docs and /redoc (disable in production)")
    rate_limit: str = Field(default="5/minute", description="Contact endpoint rate limit, e.g. 5/minute")

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    @property
    def cors_origin_list(self) -> list[str]:
        """Return the list of allowed CORS origins."""
        if self.cors_origins.strip():
            return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]
        return [self.frontend_url]

    @property
    def is_production(self) -> bool:
        return self.environment.lower() == "production"


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()