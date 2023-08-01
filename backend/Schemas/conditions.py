from pydantic import BaseModel


class PostCondition(BaseModel):
    condition: str
    order: int


class PutCondition(PostCondition):
    pass