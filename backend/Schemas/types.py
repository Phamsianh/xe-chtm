from pydantic import BaseModel


class PostType(BaseModel):
    name: str
    rule: str | None
    

class PutType(BaseModel):
    name: str
    rule: str