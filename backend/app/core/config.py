from pydantic_settings import BaseSettings, SettingsConfigDict
class Settings(BaseSettings):
    database_url: str = "postgresql+asyncpg://pomvix:pomvix@db:5432/pomvix"
    secret_key: str = "change-me"
    frontend_url: str = "http://localhost:3000"
    smtp_host: str = ""
    smtp_port: int = 587
    smtp_username: str = ""
    smtp_password: str = ""
    email_from: str = "hello@pomvix.com"
    email_to: str = "hello@pomvix.com"
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=False)
settings = Settings()