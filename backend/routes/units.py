from fastapi import APIRouter, Depends, status, HTTPException
from dependencies.db import get_session
from ORM.Model import DonviCap1, DonviCap2, DonviCap3, DonviCap4, Unit
from dependencies.user import UserDependency
from Schemas.units import PostUnits, PostUnits1, PostUnits2, PostUnits3, PostUnits4, PutUnits
from enum import Enum
import datetime
from sqlalchemy import column

router = APIRouter(
    prefix='/units',
    tags=['units'],
)


class Unitlevel(str, Enum):
    unit1 = "unit1"
    unit2 = "unit2"
    unit3 = "unit3"
    unit4 = "unit4"


############### GET ###############
@router.get("")
def get_units(
    session=Depends(get_session),
    user_dependency: UserDependency = Depends(),
):
    units1 = session.query(DonviCap1).all()
    for u1 in units1:
        units2 = u1.donvi_cap2
        for u2 in units2:
            units3 = u2.donvi_cap3
            for u3 in units3:
                u3.donvi_cap4
    return units1


@router.get("/level/{unit_level}")
def get_units_by_level(
    unit_level: Unitlevel,
    session=Depends(get_session),
    user_dependency: UserDependency = Depends(),
):
    match unit_level:
        case 'unit1':
            units = session.query(DonviCap1.Units_c1.label("unit_id"),
                                  DonviCap1.Ten_donvi.label("unit_name"),
                                  DonviCap1.Dia_chi.label("address"),
                                  DonviCap1.ngayup.label("created_at"),
                                  DonviCap1.Units_c1.label("parent_unit_id"),
                                  column("'1'", is_literal=True).label('unit_level'))
        case 'unit2':
            units = session.query(DonviCap2.Units_c2.label("unit_id"),
                                   DonviCap2.Ten_donvi.label("unit_name"),
                                   DonviCap2.Dia_chi.label("address"),
                                   DonviCap2.ngayup.label("created_at"),
                                   DonviCap2.Units_c1.label("parent_unit_id"),
                                   column("'2'", is_literal=True).label('unit_level'))
        case 'unit3':
            units = session.query(DonviCap3.Units_c3.label("unit_id"),
                                   DonviCap3.Ten_donvi.label("unit_name"),
                                   DonviCap3.Dia_chi.label("address"),
                                   DonviCap3.ngayup.label("created_at"),
                                   DonviCap3.Units_c2.label("parent_unit_id"),
                                   column("'3'", is_literal=True).label('unit_level'))
        case 'unit4':
            units = session.query(DonviCap4.Units_c4.label("unit_id"),
                                   DonviCap4.Ten_donvi.label("unit_name"),
                                   DonviCap4.Dia_chi.label("address"),
                                   DonviCap4.ngayup.label("created_at"),
                                   DonviCap4.Units_c3.label("parent_unit_id"),
                                   column("'4'", is_literal=True).label('unit_level'))
        case _:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail='unit level out of range')
    units = units.all()
    for i, u in enumerate(units):
        units[i] = u._mapping
    return units


class ParentUnitlevel(str, Enum):
    unit1 = "unit1"
    unit2 = "unit2"
    unit3 = "unit3"


@router.get("/level/{parent_unit_level}/{parent_unit_id}/childs")
def get_child_units(
    parent_unit_level: ParentUnitlevel,
    parent_unit_id: str,
    session=Depends(get_session),
    user_dependency: UserDependency = Depends(),
):
    match parent_unit_level:
        case 'unit1':
            units = session.query(DonviCap2.Units_c2.label("unit_id"),
                                  DonviCap2.Ten_donvi.label("unit_name"),
                                  DonviCap2.Dia_chi.label("address"),
                                  DonviCap2.ngayup.label("created_at"),
                                  DonviCap2.Units_c1.label("parent_unit_id"),
                                  column("'1'", is_literal=True).label('unit_level')).filter(DonviCap2.Units_c1 == parent_unit_id)
        case 'unit2':
            units = session.query(DonviCap3.Units_c3.label("unit_id"),
                                   DonviCap3.Ten_donvi.label("unit_name"),
                                   DonviCap3.Dia_chi.label("address"),
                                   DonviCap3.ngayup.label("created_at"),
                                   DonviCap3.Units_c2.label("parent_unit_id"),
                                   column("'2'", is_literal=True).label('unit_level')).filter(DonviCap3.Units_c2 == parent_unit_id)
        case 'unit3':
            units = session.query(DonviCap4.Units_c4.label("unit_id"),
                                   DonviCap4.Ten_donvi.label("unit_name"),
                                   DonviCap4.Dia_chi.label("address"),
                                   DonviCap4.ngayup.label("created_at"),
                                   DonviCap4.Units_c3.label("parent_unit_id"),
                                   column("'3'", is_literal=True).label('unit_level')).filter(DonviCap4.Units_c3 == parent_unit_id)
        case _:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail='unit level out of range')
    units = units.all()
    for i, u in enumerate(units):
        units[i] = u._mapping
    return units

@router.get("/table")
def get_units(
    session=Depends(get_session),
    user_dependency: UserDependency = Depends(),
):
    units1 = session.query(DonviCap1.Units_c1.label("unit_id"),
                           DonviCap1.Ten_donvi.label("unit_name"),
                           DonviCap1.Dia_chi.label("address"),
                           DonviCap1.ngayup.label("created_at"),
                           DonviCap1.Units_c1.label("parent_unit_id"),
                           column("'1'", is_literal=True).label('unit_level'))
    units2 = session.query(DonviCap2.Units_c2.label("unit_id"),
                           DonviCap2.Ten_donvi.label("unit_name"),
                           DonviCap2.Dia_chi.label("address"),
                           DonviCap2.ngayup.label("created_at"),
                           DonviCap2.Units_c1.label("parent_unit_id"),
                           column("'2'", is_literal=True).label('unit_level'))
    units3 = session.query(DonviCap3.Units_c3.label("unit_id"),
                           DonviCap3.Ten_donvi.label("unit_name"),
                           DonviCap3.Dia_chi.label("address"),
                           DonviCap3.ngayup.label("created_at"),
                           DonviCap3.Units_c2.label("parent_unit_id"),
                           column("'3'", is_literal=True).label('unit_level'))
    units4 = session.query(DonviCap4.Units_c4.label("unit_id"),
                           DonviCap4.Ten_donvi.label("unit_name"),
                           DonviCap4.Dia_chi.label("address"),
                           DonviCap4.ngayup.label("created_at"),
                           DonviCap4.Units_c3.label("parent_unit_id"),
                           column("'4'", is_literal=True).label('unit_level'))
    units1 = units1.union(units2, units3, units4).all()
    # units1 = units1 + units2 + units3 + units4
    for i, u in enumerate(units1):
        units1[i] = u._mapping
    return units1


############### POST ###############
# @router.post("", status_code=status.HTTP_201_CREATED)
# def create_unit1(
#     req_body: PostUnits,
#     session = Depends(get_session),
#     user_dependency: UserDependency = Depends(),
# ):
#     new_unit = Unit(**req_body.dict(exclude_unset=True))
#     new_unit.created_date = datetime.datetime.now()
#     session.add(new_unit)
#     try:
#         session.flush()
#     except Exception as e:
#         raise
#     else:
#         session.commit()
#         session.refresh(new_unit)
#     return new_unit


@router.post("/{unit_level}", status_code=status.HTTP_201_CREATED)
def create_unit1(
    unit_level: Unitlevel,
    req_body: PostUnits,
    session=Depends(get_session),
    user_dependency: UserDependency = Depends(),
):
    match unit_level:
        case 'unit1':
            schema = PostUnits1
            model = DonviCap1
            id_attr = 'Units_c1'
            parent_id_attr = ''
        case 'unit2':
            schema = PostUnits2
            model = DonviCap2
            id_attr = 'Units_c2'
            parent_id_attr = 'Units_c1'
        case 'unit3':
            schema = PostUnits3
            model = DonviCap3
            id_attr = 'Units_c3'
            parent_id_attr = 'Units_c2'
        case 'unit4':
            schema = PostUnits4
            model = DonviCap4
            id_attr = 'Units_c4'
            parent_id_attr = 'Units_c3'
        case _:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    existed_unit = session.query(model).get(req_body.unit_id)
    if existed_unit:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail='unit existed')
    val_dat = {
        "Ten_donvi": req_body.unit_name,
        "Dia_chi": req_body.unit_address
    }
    val_dat[id_attr] = req_body.unit_id
    val_dat[parent_id_attr] = req_body.parent_unit_id
    val_dat = schema(**val_dat)
    new_unit = model(**val_dat.dict(exclude_unset=True))
    new_unit.ngayup = datetime.datetime.now()
    session.add(new_unit)
    try:
        session.flush()
    except Exception as e:
        raise
    else:
        session.commit()
        session.refresh(new_unit)
    return new_unit


############### PUT ###############
@router.put("/{unit_level}/{id}")
def update_unit(
    unit_level: Unitlevel,
    id: str,
    req_body: PutUnits,
    session=Depends(get_session),
    user_dependency: UserDependency = Depends(),
):
    match unit_level:
        case 'unit1':
            existed_unit = session.query(DonviCap1).get(id)
        case 'unit2':
            existed_unit = session.query(DonviCap2).get(id)
        case 'unit3':
            existed_unit = session.query(DonviCap3).get(id)
        case 'unit4':
            existed_unit = session.query(DonviCap4).get(id)
        case _:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    if not existed_unit:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail='unit is not existed')
    val_body = req_body.dict(exclude_unset=True)
    for k, v in val_body.items():
        setattr(existed_unit, k, v)
    try:
        session.flush()
    except Exception:
        raise
    else:
        session.commit()
        session.refresh(existed_unit)
    return existed_unit


############### DELETE ###############
@router.delete("/{unit_level}/{id}", status_code=status.HTTP_410_GONE)
def delete_unit(
    unit_level: Unitlevel,
    id: str,
    session=Depends(get_session),
    user_dependency: UserDependency = Depends(),
):
    match unit_level:
        case 'unit1':
            existed_unit = session.query(DonviCap1).get(id)
        case 'unit2':
            existed_unit = session.query(DonviCap2).get(id)
        case 'unit3':
            existed_unit = session.query(DonviCap3).get(id)
        case 'unit4':
            existed_unit = session.query(DonviCap4).get(id)
        case _:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    if not existed_unit:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail='unit is not existed')
    try:
        session.delete(existed_unit)
        session.flush()
    except Exception:
        raise
    else:
        session.commit()
