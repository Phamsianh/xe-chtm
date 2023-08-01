from sqlalchemy import (BigInteger, Column, Integer,
                        ForeignKey, String, Enum)
from sqlalchemy.orm import relationship

from ORM.Base import Base


class User(Base):
    __tablename__ = "users"

    id = Column(BigInteger, primary_key=True)
    username = Column(String(100), nullable=False)
    password = Column(String(100), nullable=False)
    first_name = Column(String(500))
    last_name = Column(String(500))
    role = Column(Enum("admin", "user", name="role_enum"))

    def __repr__(self):
        return f'''
User(
id: {self.id}
Login_frm: {self.Login_frm}
username: {self.username}
password: {self.password_}
first_name: {self.first_name}
last_name: {self.last_name}
role: {self.role}
)
'''


class Condition(Base):
    __tablename__ = "conditions"

    id = Column(BigInteger, primary_key=True)
    condition = Column(String, nullable=False)
    order = Column(Integer, nullable=False)

    def __repr__(self):
        return f'''
Condition(
id: {self.id}
conditions: {self.conditions}
order: {self.order}
)
'''


class Member(Base):
    __tablename__ = "members"

    id = Column(BigInteger, primary_key=True)
    name = Column(String, nullable=False)
    order = Column(Integer, nullable=False)
    img_url_1 = Column(String)
    img_url_2 = Column(String)
    note = Column(String)

    def __repr__(self):
        return f'''
Member(
id: {self.id}
name: {self.name}
order: {self.order}
img_url_1: {self.img_url_1}
img_url_2: {self.img_url_2}
note: {self.note}
)
'''


class Equipment(Base):
    __tablename__ = "equipments"

    id = Column(BigInteger, primary_key=True)
    order = Column(Integer, nullable=False)
    name = Column(String, nullable=False)
    unit = Column(String, nullable=False)
    quantity = Column(BigInteger)

    def __repr__(self):
        return f'''
Equipment(
id: {self.id}
order: {self.order}
name: {self.name}
unit: {self.unit}
quantity: {self.quantity}
)
'''


class Type(Base):
    __tablename__ = 'types'

    id = Column(BigInteger, primary_key=True)
    name = Column(String, nullable='False')
    rule = Column(String)

    # one-to-many relationships
    contents = relationship('Content', back_populates='type')

    def __repr__(self):
        return f'''
Type(
id: {self.id}
name: {self.name}
rule: {self.rule}
)
'''


class Content(Base):
    __tablename__ = 'contents'

    id = Column(BigInteger, primary_key=True)
    order = Column(Integer, nullable=False)
    step = Column(String, nullable=False)
    video_url = Column(String)
    id_type = Column(BigInteger, ForeignKey('types.id'), nullable=False)

    # many-to-one relationships
    type = relationship('Type', back_populates='contents')

    def __repr__(self):
        return f'''
Content(
id: {self.id}
order: {self.order}
step: {self.step}
video_url: {self.video_url}
id_type: {self.id_type}
)
'''
