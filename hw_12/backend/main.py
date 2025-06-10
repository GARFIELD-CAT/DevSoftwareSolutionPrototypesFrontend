from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import re
import uvicorn
from pydantic import BaseModel, Field, field_validator


# models
class LoginRequest(BaseModel): 
    email: str = Field(description="Email")
    password: str = Field(description="Пароль")

    @field_validator("email", mode="before")
    def validate_email(cls, value):
        email_regex = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        if not re.match(email_regex, value):
            raise ValueError("Некорректный адрес электронной почты.")

        return value
    
    @field_validator("password", mode="before")
    def validate_password(cls, value):

        if len(value) < 6:
            raise ValueError("Пароль должен содержать не менее 6 символов")

        return value




app = FastAPI()

# Разрешаем доступ с любого источника (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/login")
def login(request: LoginRequest):
    if request.email == "testuser@example.com":
        return {"token": "test-jwt-token"}
    raise HTTPException(status_code=401, detail="Неверный логин или пароль")


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8000,
        reload=True,
    )
