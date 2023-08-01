from pydantic import BaseModel


class PostMember(BaseModel):
    name: str
    order: int = 1
    img_url_1: str | None
    img_url_2: str | None
    note: str | None
    

class PutMember(PostMember):
    pass