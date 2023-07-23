from typing import Annotated
from fastapi import APIRouter, Depends, Query
from dependencies.db import get_session
from ORM.Model import DmCanbo
from dependencies.user import UserDependency

router = APIRouter(
    prefix='/dm_canbo',
    tags=['dm_canbo'],
)

@router.get("")
async def get_dm_canbo(
    offset: Annotated[int | None, Query()] = 0,
    limit: Annotated[int | None, Query()] = 100,
    session = Depends(get_session),
    user_dependency: UserDependency = Depends(),
    ):
    dm_canbo = session.query(DmCanbo).order_by(DmCanbo.MaCB).offset(offset).limit(limit).all()
    return dm_canbo
