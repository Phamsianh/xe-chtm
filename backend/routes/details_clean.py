from typing import Annotated
from fastapi import APIRouter, Depends, Query
from dependencies.db import get_session
from ORM.Model import DetailsClean
from Schema import DetailsCleanSchema
from dependencies.user import UserDependency

router = APIRouter(
    prefix='/details_clean',
    tags=['details_clean'],
)

@router.get("")
async def get_details_clean(
    offset: Annotated[int | None, Query()] = 0,
    limit: Annotated[int | None, Query()] = 100,
    session = Depends(get_session),
    user_dependency: UserDependency = Depends(),
    ):
    accounts = session.query(DetailsClean).order_by(DetailsClean.MAC).offset(offset).limit(limit).all()
    return accounts
