from pydantic import BaseModel

class PostEquipment(BaseModel):
    order: int
    name: str
    unit: str
    quantity: int | None


class PutEquipment(BaseModel):
    order: int
    name: str
    unit: str
    quantity: int