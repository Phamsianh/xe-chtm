from typing import Annotated
from fastapi import APIRouter, Depends, Query
from dependencies.db import get_session
from ORM.Model import LogStatus
from dependencies.user import UserDependency

router = APIRouter(
    prefix='/log_status',
    tags=['log_status'],
)

@router.get("")
async def get_log_status(
    offset: Annotated[int | None, Query()] = 0,
    limit: Annotated[int | None, Query()] = 100,
    session = Depends(get_session),
    user_dependency: UserDependency = Depends(),
    ):
    log_status = session.query(LogStatus).order_by(LogStatus.Ma).offset(offset).limit(limit).all()
    return log_status
