from urllib.parse import urlparse

from pydantic import BaseModel, EmailStr, Field, field_validator


def validate_optional_url(value: str | None) -> str | None:
    if value is None or not value.strip():
        return None
    candidate = value.strip()
    parsed = urlparse(candidate)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        raise ValueError("Enter a valid URL beginning with https://")
    return candidate


class ContactCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    company: str | None = Field(default=None, max_length=160)
    website: str | None = Field(default=None, max_length=2048)
    linkedin: str | None = Field(default=None, max_length=2048)
    message: str = Field(min_length=10, max_length=5000)
    landing_page_url: str | None = Field(default=None, max_length=2048)
    referrer: str | None = Field(default=None, max_length=2048)
    utm_source: str | None = Field(default=None, max_length=200)
    utm_medium: str | None = Field(default=None, max_length=200)
    utm_campaign: str | None = Field(default=None, max_length=200)
    utm_content: str | None = Field(default=None, max_length=200)
    utm_term: str | None = Field(default=None, max_length=200)

    _validate_urls = field_validator("website", "linkedin", "landing_page_url", mode="before")(
        validate_optional_url
    )


class ContactResponse(BaseModel):
    message: str