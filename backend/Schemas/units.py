from pydantic import BaseModel

############################## POST ##############################
class PostUnits(BaseModel):
    unit_id: str
    parent_unit_id: str
    unit_name: str
    unit_address: str


class PostUnits1(BaseModel):
    Units_c1: str
    Ten_donvi: str
    Dia_chi: str
    

class PostUnits2(BaseModel):
    Units_c2: str
    Units_c1: str
    Ten_donvi: str
    Dia_chi: str


class PostUnits3(BaseModel):
    Units_c3: str
    Units_c2: str
    Ten_donvi: str
    Dia_chi: str


class PostUnits4(BaseModel):
    Units_c4: str
    Units_c3: str
    Ten_donvi: str
    Dia_chi: str

############################## GET ##############################
class GetUnits(BaseModel):
    unit_id: int
    parent_unit_id: int
    unit_name: str
    unit_address: str
    created_date: str


class GetUnits1(BaseModel):
    Units_c1: str
    Ten_donvi: str
    Dia_chi: str
    ngayup: str


class GetUnits2(BaseModel):
    Units_c2: str
    Units_c1: str
    Ten_donvi: str
    Dia_chi: str
    ngayup: str


class GetUnits3(BaseModel):
    Units_c3: str
    Units_c2: str
    Ten_donvi: str
    Dia_chi: str
    ngayup: str


class GetUnits4(BaseModel):
    Units_c4: str
    Units_c3: str
    Ten_donvi: str
    Dia_chi: str
    ngayup: str


############################## PUT ##############################
class PutUnits(BaseModel):
    Ten_donvi: str | None
    Dia_chi: str | None
