from pydantic import BaseModel

class PostContent(BaseModel):
    order: int
    step: str
    video_url: str | None
    id_type: int


class PutContent(PostContent):
    pass
