from fastapi import APIRouter, Depends, status, HTTPException
from dependencies.db import get_session
from ORM.Model import Equipment
from Schemas.equipments import PostEquipment, PutEquipment
from dependencies.user import UserDependency

router = APIRouter(
    prefix='/equipments',
    tags=['equipments'],
)


############### GET ###############
@router.get("")
def get_equipments(
    session=Depends(get_session),
):
    equipments = session.query(Equipment).all()
    return equipments


@router.post("", status_code=status.HTTP_201_CREATED)
def create_equipment(
    req_body: PostEquipment,
    session=Depends(get_session),
    user_dependency: UserDependency = Depends(),
):
    new_equipment = Equipment(**req_body.dict(exclude_unset=True))
    session.add(new_equipment)
    try:
        session.flush()
    except Exception as e:
        raise
    else:
        session.commit()
        session.refresh(new_equipment)
    return new_equipment


# ############### PUT ###############
@router.put("/{id}")
def update_equipment(
    id: int,
    req_body: PutEquipment,
    session=Depends(get_session),
    user_dependency: UserDependency = Depends(),
):
    existed_equipment = session.query(Equipment).get(id)
    if not existed_equipment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='equipment is not found')
    val_dat = req_body.dict(exclude_unset=True)
    for k, v in val_dat.items():
        setattr(existed_equipment, k, v)
    try:
        session.flush()
    except Exception:
        raise
    else:
        session.commit()
        session.refresh(existed_equipment)
    return existed_equipment


# ############### DELETE ###############
@router.delete("/{id}", status_code=status.HTTP_410_GONE)
def delete_equipment(
    id: str,
    session=Depends(get_session),
    user_dependency: UserDependency = Depends(),
):
    existed_equipment = session.query(Equipment).get(id)
    if not existed_equipment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='equipment is not found')
    try:
        session.delete(existed_equipment)
        session.flush()
    except Exception:
        raise
    else:
        session.commit()
