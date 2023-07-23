from pydantic import BaseModel


class DmCanboSchema(BaseModel):
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


class AccountSchema(BaseModel):
    Login_frm: str
    nhom_user: str
    username: str
    password_: str
    password_2: str
    MaCB:str


class LogAccountSchema(BaseModel):
    Event_: str
    _insert: str
    _update: str
    _delete: str
    MaCB: str
    ngayup: str


class UpdateAppSchema(BaseModel):
    ID: int
    Versions: str
    Time_update: str
    Log_update: str
    ID_Account: str


class DonviCap1Schema(BaseModel):
    Units_c1: str
    Ten_donvi: str
    Dia_chi: str
    ngayup: str


class DonviCap2Schema(BaseModel):
    Units_c2: str
    Ten_donvi: str
    Dia_chi: str
    ngayup: str
    Units_c1: str


class DonviCap3Schema(BaseModel):
    Units_c3: str
    Ten_donvi: str
    Dia_chi: str
    ngayup: str
    Units_c2: str


class DonviCap4Schema(BaseModel):
    Units_c4: str
    Ten_donvi: str
    Dia_chi: str
    ngayup: str
    Units_c3: str


class DetailsCleanSchema(BaseModel):
    Ma: int
    MAC: str
    Details_ID: str
    Time_Implement: str
    Time_Stop: str
    ngayup: str


class LogStatusSchema(BaseModel):
    ID: int
    Status_ID: str
    Details: str
    Ma: int
    Trangthai: str


class PolicyWinCleanSchema(BaseModel):
    ID: str
    Name_policy: str
    Name_scripts: str
    Details: str
    bool_policy: str


class StartPolicySchema(BaseModel):
    Ma: int
    ID_policy: str
    date_start: str