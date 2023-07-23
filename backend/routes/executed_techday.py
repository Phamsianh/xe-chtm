from fastapi import APIRouter, Depends
from dependencies.db import get_session
from ORM.Model import DmCanbo, DonviCap1, DonviCap2, DonviCap3, DonviCap4, DetailsClean, LogStatus, PolicyWinClean
from sqlalchemy.orm import aliased
from dependencies.user import UserDependency

router = APIRouter(
    prefix='/executed_techday',
    tags=['executed_techday'],
)

@router.get("")
async def get_executed_techday(
    session = Depends(get_session),
    user_dependency: UserDependency = Depends(),
    ):
    data = session.query(
        DmCanbo.Hoten,
        DmCanbo.Position,
        DmCanbo.Computer_name,
        DmCanbo.MAC,
        DonviCap1.Ten_donvi,
        DonviCap2.Ten_donvi,
        DonviCap3.Ten_donvi,
        DonviCap4.Ten_donvi,
        PolicyWinClean.Name_policy,
        LogStatus.Details,
        LogStatus.Trangthai,
        DetailsClean.Time_Implement,
        DetailsClean.Time_Stop,
        DetailsClean.ngayup,
        DetailsClean.Ma
            ).\
            join(DmCanbo, DmCanbo.MAC == DetailsClean.MAC).\
            join(DonviCap4, DonviCap4.Units_c4 == DmCanbo.Units_c4).\
            join(DonviCap3, DonviCap3.Units_c3 == DonviCap4.Units_c3).\
            join(DonviCap2, DonviCap2.Units_c2 == DonviCap3.Units_c2).\
            join(DonviCap1, DonviCap1.Units_c1 == DonviCap2.Units_c1).\
            join(LogStatus, LogStatus.Ma == DetailsClean.Ma).\
            join(PolicyWinClean, PolicyWinClean.ID == DetailsClean.Details_ID).\
            all()
    print(data[0])
    resp = []
    for d in data:
        cadres_name, cadres_position, cadres_computer_name, Mac, unit1, unit2, unit3, unit4, name_policy, details, status, time_implement, time_stop, ngayup, ma = d
        resp.append({
            'id': ma,
            'cadres_name': cadres_name,
            'cadres_position': cadres_position,
            'cadres_computer_name': cadres_computer_name,
            'Mac': Mac,
            'unit': f'{unit1}/{unit2}/{unit3}/{unit4}',
            'name_policy': name_policy,
            'details': details,
            'status': status,
            'time_implement': time_implement,
            'time_stop': time_stop,
            'time_upload': ngayup
        })
    return resp

