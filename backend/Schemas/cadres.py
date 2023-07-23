from pydantic import BaseModel


class PostCadresSchema(BaseModel):
    MaCB: str
    Units_c1: str
    Units_c2: str
    Units_c3: str
    Units_c4: str
    Hoten: str
    Computer_name: str
    MAC: str
    Position: str
    Auto_start: str

class PutCadresSchema(BaseModel):
    Hoten: str
    Position: str
    Auto_start: str