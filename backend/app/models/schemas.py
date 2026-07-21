from pydantic import BaseModel, EmailStr, field_validator
import re


class UserRegister(BaseModel):
    email: EmailStr
    password: str

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: EmailStr):
        domain = value.split("@")[1].lower()

        blocked_domains = {
            "example.com",
            "example.org",
            "example.net"
        }

        if domain in blocked_domains:
            raise ValueError("Please use a real email address.")

        return value

    @field_validator("password")
    @classmethod
    def validate_password(cls, value: str):

        if len(value) < 8:
            raise ValueError(
                "Password must be at least 8 characters long."
            )

        if not re.search(r"[A-Z]", value):
            raise ValueError(
                "Password must contain at least one uppercase letter."
            )

        if not re.search(r"[a-z]", value):
            raise ValueError(
                "Password must contain at least one lowercase letter."
            )

        if not re.search(r"\d", value):
            raise ValueError(
                "Password must contain at least one number."
            )

        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", value):
            raise ValueError(
                "Password must contain at least one special character."
            )

        if " " in value:
            raise ValueError(
                "Password cannot contain spaces."
            )

        return value


class UserLogin(BaseModel):
    email: EmailStr
    password: str