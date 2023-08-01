from fastapi import APIRouter
import os

router = APIRouter(
    prefix='/reset_db',
    tags=['reset_db'],
)


############### GET ###############
@router.get("")
def reset_database():
    os.system('python -m ORM.migration')
    