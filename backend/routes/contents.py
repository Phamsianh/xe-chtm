from fastapi import APIRouter, Depends, status, HTTPException
from dependencies.db import get_session
from ORM.Model import Content, Type
from Schemas.contents import PostContent, PutContent
from dependencies.user import UserDependency

router = APIRouter(
    prefix='/contents',
    tags=['contents'],
)


############### GET ###############
@router.get("")
def get_contents(
    session=Depends(get_session),
):
    contents = session.query(Content).all()
    return contents


@router.get("/{id_type}")
def get_contents_by_type(
    id_type: int,
    session=Depends(get_session),
):
    contents = session.query(Content).filter(Content.id_type == id_type).order_by(Content.order).all()
    return contents

############### POST ###############
@router.post("", status_code=status.HTTP_201_CREATED)
def create_content(
    req_body: PostContent,
    session=Depends(get_session),
    user_dependency: UserDependency = Depends(),
):
    existed_type = session.query(Type).get(req_body.id_type)
    if not existed_type:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='type is not found')
    new_content = Content(**req_body.dict(exclude_unset=True))
    session.add(new_content)
    try:
        session.flush()
    except Exception as e:
        raise
    else:
        session.commit()
        session.refresh(new_content)
    return new_content


# ############### PUT ###############
@router.put("/{id}")
def update_content(
    id: int,
    req_body: PutContent,
    session=Depends(get_session),
    user_dependency: UserDependency = Depends(),
):
    existed_content = session.query(Content).get(id)
    if not existed_content:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='content is not found')
    existed_type = session.query(Type).get(req_body.id_type)
    if not existed_type:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='type is not found')
    val_dat = req_body.dict(exclude_unset=True)
    for k, v in val_dat.items():
        setattr(existed_content, k, v)
    try:
        session.flush()
    except Exception:
        raise
    else:
        session.commit()
        session.refresh(existed_content)
    return existed_content


# ############### DELETE ###############
@router.delete("/{id}", status_code=status.HTTP_410_GONE)
def delete_content(
    id: str,
    session=Depends(get_session),
    user_dependency: UserDependency = Depends(),
):
    existed_content = session.query(Content).get(id)
    if not existed_content:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='content is not found')
    try:
        session.delete(existed_content)
        session.flush()
    except Exception:
        raise
    else:
        session.commit()
