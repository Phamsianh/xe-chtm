from fastapi import APIRouter, Depends, status, HTTPException
from dependencies.db import get_session
from ORM.Model import Condition
from Schemas.conditions import PostCondition, PutCondition
from dependencies.user import UserDependency

router = APIRouter(
    prefix='/conditions',
    tags=['coditions'],
)


############### GET ###############
@router.get("")
def get_conditions(
    session=Depends(get_session),
):
    conditions = session.query(Condition).all()
    return conditions


@router.post("", status_code=status.HTTP_201_CREATED)
def create_condition(
    req_body: PostCondition,
    session=Depends(get_session),
    user_dependency: UserDependency = Depends(),
):
    new_condition = Condition(**req_body.dict(exclude_unset=True))
    session.add(new_condition)
    try:
        session.flush()
    except Exception as e:
        raise
    else:
        session.commit()
        session.refresh(new_condition)
    return new_condition


# ############### PUT ###############
@router.put("/{id}")
def update_condition(
    id: int,
    req_body: PutCondition,
    session=Depends(get_session),
    user_dependency: UserDependency = Depends(),
):
    existed_condition = session.query(Condition).get(id)
    if not existed_condition:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='condition is not foun')
    existed_condition.condition = req_body.condition
    existed_condition.order = req_body.order
    try:
        session.flush()
    except Exception:
        raise
    else:
        session.commit()
        session.refresh(existed_condition)
    return existed_condition


# ############### DELETE ###############
@router.delete("/{id}", status_code=status.HTTP_410_GONE)
def delete_condition(
    id: str,
    session=Depends(get_session),
    user_dependency: UserDependency = Depends(),
):
    existed_condition = session.query(Condition).get(id)
    if not existed_condition:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='condition is not found')
    try:
        session.delete(existed_condition)
        session.flush()
    except Exception:
        raise 
    else:
        session.commit()
