from pydantic import BaseModel

class GetUser(BaseModel):
    id: int
    username: str
    first_name: str
    last_name: str
    role: str
