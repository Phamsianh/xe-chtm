from fastapi import APIRouter, Depends, status, HTTPException
from dependencies.db import get_session
from ORM.Model import User
from dependencies.user import UserDependency

router = APIRouter(
    prefix='/users',
    tags=['users'],
)


############### GET ###############
@router.get("")
def get_users(
    session=Depends(get_session),
):
    users = session.query(User).all()
    return users


@router.get("/me")
def get_users(
    session=Depends(get_session),
    user_dependency: UserDependency = Depends(),
):
    user = user_dependency.get_current_user()
    return user