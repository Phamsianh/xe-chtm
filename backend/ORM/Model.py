from sqlalchemy import (BigInteger, Column, DateTime,
                        ForeignKey, String, NVARCHAR, func)
from sqlalchemy.orm import relationship

from ORM.Base import Base


class DmCanbo(Base):
    __tablename__ = "Dm_Canbo"
    MaCB = Column(String(100), primary_key=True)
    Units_c1 = Column(String(30))
    Units_c2 = Column(String(30))
    Units_c3 = Column(String(30))
    Units_c4 = Column(String(30))
    Hoten = Column(NVARCHAR(100))
    Computer_name = Column(String(500), nullable=False)
    MAC = Column(String(30), nullable=False)
    Position = Column(NVARCHAR(200))
    Auto_start = Column(NVARCHAR(200))

    # one-to-many relationship(s)
    account = relationship('Account', back_populates='canbo')
    log_account = relationship('LogAccount', back_populates='canbo')

    def __repr__(self):
        return f'''
Dm_Canbo(
MaCB: {self.MaCB}
Units_c1: {self.Units_c1}
Units_c2: {self.Units_c2}
Units_c3: {self.Units_c3}
Units_c4: {self.Units_c4}
Hoten: {self.Hoten}
Computer_name: {self.Computer_name}
MAC: {self.MAC}
Position: {self.Position}
Auto_start: {self.Auto_start}
)
'''


class Account(Base):
    __tablename__ = "Account"

    Ma = Column(BigInteger, primary_key=True)
    Login_frm = Column(NVARCHAR, nullable=False)
    nhom_user = Column(String(200), nullable=False)
    username = Column(String(500), nullable=False)
    password_ = Column(String(500), nullable=False)
    password_2 = Column(String(500), nullable=False)
    MaCB = Column(String(100), ForeignKey('Dm_Canbo.MaCB'))

    # many-to-one relationship
    canbo = relationship('DmCanbo', back_populates='account')

    # one-to-many relationships
    update_app = relationship('UpdateApp', back_populates='account')

    def __repr__(self):
        return f'''
Account(
Ma: {self.Ma}
Login_frm: {self.Login_frm}
nhom_user: {self.nhom_user}
username: {self.username}
password_: {self.password_}
password_2: {self.password_2}
MaCB: {self.MaCB}
)
'''


class LogAccount(Base):
    __tablename__ = "Log_account"

    Event_ = Column(NVARCHAR, primary_key=True, nullable=False)
    _insert = Column(NVARCHAR)
    _update = Column(NVARCHAR)
    _delete = Column(NVARCHAR)
    MaCB = Column(String(100), ForeignKey('Dm_Canbo.MaCB'), nullable=False)
    ngayup = Column(String)

    # many-to-one relationship
    canbo = relationship('DmCanbo', back_populates='log_account')

    def __repr__(self):
        return f'''
LogAccount(
Event_: {self.Event_}
_insert: {self._insert}
_update: {self._update}
_delete: {self._delete}
MaCB: {self.MaCB}
ngayup: {self.ngayup}
)
'''


class UpdateApp(Base):
    __tablename__ = "Update_App"

    ID = Column(BigInteger, primary_key=True)
    Versions = Column(NVARCHAR(500))
    Time_update = Column(String(20))
    Log_update = Column(NVARCHAR)
    ID_Account = Column(NVARCHAR(500), ForeignKey('Account.Ma'))

    # many-to-one relationship
    account = relationship('Account', back_populates='update_app')

    def __repr__(self):
        return f'''
LogAccount(
Event_: {self.Event_}
_insert: {self._insert}
_update: {self._update}
_delete: {self._delete}
MaCB: {self.MaCB}
ngayup: {self.ngayup}
)
'''


class Unit(Base):
    __tablename__ = 'units'

    unit_id = Column(BigInteger, primary_key=True)
    parent_unit_id = Column(BigInteger, ForeignKey('units.unit_id'))
    unit_name = Column(String)
    unit_address = Column(String)
    created_date = Column(String)

    def __repr__(self):
        return f'''
Unit(
unit_id: {self.unit_id}
parent_unit_id: {self.parent_unit_id}
unit_name: {self.unit_name}
unit_address: {self.unit_address}
created_date: {self.created_date}
)
'''
    

class DonviCap1(Base):
    __tablename__ = 'Donvi_cap1'

    Units_c1 = Column(String(30), primary_key=True)
    Ten_donvi = Column(NVARCHAR(200), nullable=False)
    Dia_chi = Column(NVARCHAR)
    ngayup = Column(DateTime, nullable=False)

    # one-to-many relationships
    donvi_cap2 = relationship('DonviCap2', back_populates='donvi_cap1')

    def __repr__(self):
        return f'''
DonviCap1(
Units_c1: {self.Units_c1}
Ten_donvi: {self.Ten_donvi}
Dia_chi: {self.Dia_chi}
ngayup: {self.ngayup}
)
'''


class DonviCap2(Base):
    __tablename__ = 'Donvi_cap2'

    Units_c2 = Column(String(30), primary_key=True)
    Ten_donvi = Column(NVARCHAR(200), nullable=False)
    Dia_chi = Column(NVARCHAR)
    ngayup = Column(DateTime, nullable=False)
    Units_c1 = Column(String(30), ForeignKey(
        'Donvi_cap1.Units_c1'), nullable=False)

    # many-to-one relationships
    donvi_cap1 = relationship('DonviCap1', back_populates='donvi_cap2')

    # one-to-many relationships
    donvi_cap3 = relationship('DonviCap3', back_populates='donvi_cap2')

    def __repr__(self):
        return f'''
DonviCap2(
Units_c2: {self.Units_c2}
Ten_donvi: {self.Ten_donvi}
Dia_chi: {self.Dia_chi}
ngayup: {self.ngayup}
Units_c1: {self.Units_c1}
)
'''


class DonviCap3(Base):
    __tablename__ = 'Donvi_cap3'

    Units_c3 = Column(String(30), primary_key=True)
    Ten_donvi = Column(NVARCHAR(200), nullable=False)
    Dia_chi = Column(NVARCHAR)
    ngayup = Column(DateTime, nullable=False)
    Units_c2 = Column(String(30), ForeignKey(
        'Donvi_cap2.Units_c2'), nullable=False)

    # many-to-one relationships
    donvi_cap2 = relationship('DonviCap2', back_populates='donvi_cap3')

    # one-to-many relationships
    donvi_cap4 = relationship('DonviCap4', back_populates='donvi_cap3')

    def __repr__(self):
        return f'''
DonviCap3(
Units_c3: {self.Units_c3}
Ten_donvi: {self.Ten_donvi}
Dia_chi: {self.Dia_chi}
ngayup: {self.ngayup}
Units_c2: {self.Units_c2}
)
'''


class DonviCap4(Base):
    __tablename__ = 'Donvi_cap4'

    Units_c4 = Column(String(30), primary_key=True)
    Ten_donvi = Column(NVARCHAR(200), nullable=False)
    Dia_chi = Column(NVARCHAR)
    ngayup = Column(DateTime, nullable=False)
    Units_c3 = Column(String(30), ForeignKey(
        'Donvi_cap3.Units_c3'), nullable=False)

    # many-to-one relationships
    donvi_cap3 = relationship('DonviCap3', back_populates='donvi_cap4')

    def __repr__(self):
        return f'''
DonviCap4(
Units_c4: {self.Units_c4}
Ten_donvi: {self.Ten_donvi}
Dia_chi: {self.Dia_chi}
ngayup: {self.ngayup}
Units_c3: {self.Units_c3}
)
'''


class DetailsClean(Base):
    __tablename__ = 'Details_Clean'

    Ma = Column(BigInteger, primary_key=True)
    MAC = Column(String(30), nullable=False)
    Details_ID = Column(String(100), nullable=True)
    Time_Implement = Column(String(20))
    Time_Stop = Column(String(20))
    ngayup = Column(String(20))

    # one-to-many relationship
    log_status = relationship('LogStatus', back_populates='detail_clean')

    def __repr__(self):
        return f'''
DetailsClean(
Ma: {self.Ma}
MAC: {self.MAC}
Details_ID: {self.Details_ID}
Time_Implement: {self.Time_Implement}
Time_Stop: {self.Time_Stop}
ngayup: {self.ngayup}
)
'''


class LogStatus(Base):
    __tablename__ = 'Log_Status'

    ID = Column(BigInteger, primary_key=True)
    Status_ID = Column(NVARCHAR(100))
    Details = Column(NVARCHAR)
    Ma = Column(BigInteger, ForeignKey('Details_Clean.Ma'))
    Trangthai = Column(NVARCHAR(100))

    # many-to-one relationships
    detail_clean = relationship('DetailsClean', back_populates='log_status')

    def __repr__(self):
        return f'''
LogStatus(
ID: {self.ID}
Status_ID: {self.Status_ID}
Details: {self.Details}
Ma: {self.Ma}
Trangthai: {self.Trangthai}
)
'''


class PolicyWinClean(Base):
    __tablename__ = 'Policy_WinClean'

    ID = Column(String(30), primary_key=True)
    Name_policy = Column(NVARCHAR(1000), nullable=False)
    Name_scripts = Column(NVARCHAR(1000), nullable=False)
    Details = Column(NVARCHAR, nullable=False)
    bool_policy = Column(NVARCHAR(10), nullable=False)

    def __repr__(self):
        return f'''
PolicyWinClean(
ID: {self.ID}
Name_policy: {self.Name_policy}
Name_scripts: {self.Name_scripts}
Details: {self.Details}
bool_policy: {self.bool_policy}
)
'''



class StartPolicy(Base):
    __tablename__ = 'Start_policy'

    Ma = Column(BigInteger, primary_key=True)
    ID_Policy = Column(NVARCHAR, nullable=False)
    date_start = Column(NVARCHAR)

    def __repr__(self):
        return f'''
PolicyWinClean(
Ma: {self.Ma}
ID_Policy: {self.ID_Policy}
date_start: {self.date_start}
)
'''