from fastapi import APIRouter, Depends
from dependencies.db import get_session
from ORM.Model import DonviCap1, DmCanbo, DetailsClean
from dependencies.user import UserDependency

router = APIRouter(
    prefix='/total',
    tags=['total'],
)

@router.get("")
async def get_total(
    session = Depends(get_session),
    user_dependency: UserDependency = Depends(),
    ):
    total_unit = session.query(DonviCap1).count()
    total_unit_executed = session.query(DmCanbo.Units_c1).join(DetailsClean, DetailsClean.MAC == DmCanbo.MAC).group_by(DmCanbo.Units_c1).count()
    total_device = session.query(DmCanbo).count()
    total_device_executed = session.query(DetailsClean.MAC).group_by(DetailsClean.MAC).count()
    return [
        [
            {
                'name': 'Tổng số đơn vị',
                'value': total_unit
            },
            {
                'name': 'Tổng số đơn vị thực hiện NKT',
                'value': total_unit_executed
            },
            {
                'name': 'Tổng số đơn vị chưa thực hiện NKT',
                'value': total_unit - total_unit_executed
            },
        ],
        [
            {
                'name': 'Tổng số thiết bị',
                'value': total_device
            },
            {
                'name': 'Tổng số thiết bị thực hiện NKT',
                'value': total_device_executed
            },
            {
                'name': 'Tổng số thiết bị chưa thực hiện NKT',
                'value': total_device - total_device_executed
            }
        ]
    ]
        
