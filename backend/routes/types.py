from fastapi import APIRouter, Depends, status, HTTPException
from dependencies.db import get_session
from ORM.Model import Type
from Schemas.types import PostType, PutType
from dependencies.user import UserDependency

router = APIRouter(
    prefix='/types',
    tags=['types'],
)


############### GET ###############
@router.get("")
def get_types(
    session=Depends(get_session),
):
    types = session.query(Type).all()
    return types


############### POST ###############
@router.post("/", status_code=status.HTTP_201_CREATED)
def create_type(
    req_body: PostType,
    session=Depends(get_session),
    user_dependency: UserDependency = Depends(),
):
    new_type = Type(**req_body.dict(exclude_unset=True))
    session.add(new_type)
    try:
        session.flush()
    except Exception as e:
        raise
    else:
        session.commit()
        session.refresh(new_type)
    return new_type


# ############### PUT ###############
@router.put("/{id}")
def update_type(
    id: int,
    req_body: PutType,
    session=Depends(get_session),
    user_dependency: UserDependency = Depends(),
):
    existed_type = session.query(Type).get(id)
    if not existed_type:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='type is not found')
    val_dat = req_body.dict(exclude_unset=True)
    for k, v in val_dat.items():
        setattr(existed_type, k, v)
    try:
        session.flush()
    except Exception:
        raise
    else:
        session.commit()
        session.refresh(existed_type)
    return existed_type


# ############### DELETE ###############
@router.delete("/{id}", status_code=status.HTTP_410_GONE)
def delete_type(
    id: str,
    session=Depends(get_session),
    user_dependency: UserDependency = Depends(),
):
    existed_type = session.query(Type).get(id)
    if not existed_type:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='type is not found')
    try:
        session.delete(existed_type)
        session.flush()
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='cannot delete types')
    else:
        session.commit()
