from fastapi import APIRouter, Depends, status, HTTPException
from dependencies.db import get_session
from ORM.Model import Member
from Schemas.members import PostMember, PutMember
from dependencies.user import UserDependency

router = APIRouter(
    prefix='/members',
    tags=['members'],
)


############### GET ###############
@router.get("")
def get_members(
    session=Depends(get_session),
):
    members = session.query(Member).all()
    return members


@router.post("", status_code=status.HTTP_201_CREATED)
def create_member(
    req_body: PostMember,
    session=Depends(get_session),
    user_dependency: UserDependency = Depends(),
):
    new_member = Member(**req_body.dict(exclude_unset=True))
    session.add(new_member)
    try:
        session.flush()
    except Exception as e:
        raise
    else:
        session.commit()
        session.refresh(new_member)
    return new_member


# ############### PUT ###############
@router.put("/{id}")
def update_member(
    id: int,
    req_body: PutMember,
    session=Depends(get_session),
    user_dependency: UserDependency = Depends(),
):
    existed_member = session.query(Member).get(id)
    if not existed_member:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='member is not found')
    val_dat = req_body.dict(exclude_unset=True)
    for k, v in val_dat.items():
        setattr(existed_member, k, v)
    try:
        session.flush()
    except Exception:
        raise
    else:
        session.commit()
        session.refresh(existed_member)
    return existed_member


# ############### DELETE ###############
@router.delete("/{id}", status_code=status.HTTP_410_GONE)
def delete_member(
    id: str,
    session=Depends(get_session),
    user_dependency: UserDependency = Depends(),
):
    existed_member = session.query(Member).get(id)
    if not existed_member:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='member is not found')
    try:
        session.delete(existed_member)
        session.flush()
    except Exception:
        raise
    else:
        session.commit()
