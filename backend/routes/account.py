from typing import Annotated
from fastapi import APIRouter, Depends, Query, HTTPException, status
from dependencies.db import get_session
from ORM.Model import Account
from dependencies.user import UserDependency

router = APIRouter(
    prefix='/accounts',
    tags=['account'],
)

@router.get("")
async def get_accounts(
    offset: Annotated[int | None, Query()] = 0,
    limit: Annotated[int | None, Query()] = 100,
    session = Depends(get_session),
    # user_dependency: UserDependency = Depends(),
    ):
    accounts = session.query(Account).order_by(Account.MaCB).offset(offset).limit(limit).all()
    return accounts


@router.get("/{username}")
async def get_accounts(
    username: str,
    session = Depends(get_session),
    user_dependency: UserDependency = Depends(),
    ):
    if username == 'me':
        return user_dependency.get_current_user()
    user = session.query(Account).filter(Account.username == username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='username not found')
    return user