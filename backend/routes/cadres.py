from typing import Annotated
from fastapi import APIRouter, Depends, Query, HTTPException, status
from dependencies.db import get_session
from ORM.Model import DmCanbo
from dependencies.user import UserDependency
from Schemas.cadres import PostCadresSchema, PutCadresSchema

router = APIRouter(
    prefix='/cadres',
    tags=['cadres'],
)

@router.get("")
async def get_cadres(
    session = Depends(get_session),
    user_dependency: UserDependency = Depends(),
    ):
    cadres = session.query(DmCanbo).all()
    return cadres

@router.get("/{cadres_id}")
async def get_cadres(
    cadres_id: str,
    session = Depends(get_session),
    user_dependency: UserDependency = Depends(),
    ):
    if cadres_id == 'me':
        return user_dependency.get_current_user().canbo
    cadres = session.query(DmCanbo).filter(DmCanbo.MaCB == cadres_id).first()
    if not cadres:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Cadres not found')
    return cadres


@router.post("")
def create_cadres(
    req_bod: PostCadresSchema,
    session = Depends(get_session),
    user_dependency: UserDependency = Depends(),
):
    existed_cadres = session.query(DmCanbo).get(req_bod.MaCB)
    if existed_cadres:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='cadres is existed')
    new_cadres = DmCanbo(**req_bod.dict())
    try:
        session.add(new_cadres)
    except:
        raise
    else:
        session.commit()
        session.refresh(new_cadres)
    return new_cadres


@router.put("/{cadres_id}")
def update_cadres(
    cadres_id: str,
    req_body: PutCadresSchema,
    session = Depends(get_session),
    user_dependency: UserDependency = Depends()
):
    existed_cadres = session.query(DmCanbo).get(cadres_id)
    if not existed_cadres:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='cadres is not found')
    val_dat = req_body.dict(exclude_unset=True)
    for k, v in val_dat.items():
        setattr(existed_cadres, k, v)
    try:
        session.flush()
    except:
        raise
    else:
        session.commit()
        session.refresh(existed_cadres)
    return existed_cadres


@router.delete("/{cadres_id}", status_code=status.HTTP_410_GONE)
def delete_cadres(
    cadres_id: str,
    session = Depends(get_session),
    user_dependency: UserDependency = Depends()
):
    existed_cadres = session.query(DmCanbo).get(cadres_id)
    if not existed_cadres:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="cadres is not found")
    session.delete(existed_cadres)
    try:
        session.flush()
    except:
        raise
    else:
        session.commit()