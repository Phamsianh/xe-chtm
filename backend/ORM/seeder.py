from ORM.Model import *
from ORM.session import session

admin = User(username='admin', password='password',
             first_name='Admin', role='admin')
user = User(username='user', password='password',
            first_name='User', role='user')

condition1 = Condition(condition='- Đủ diện tích mặt bằng để bố trí bãi tập….', order=1)
condition2 = Condition(
    condition='- Triển khai xe ngoài công sự hoặc trong công sự ….', order=2)
condition3 = Condition(
    condition='- Trong mọi điều kiện thời tiết, ban ngày cũng như ban đêm.', order=3)
condition4 = Condition(condition='- Cự ly: 900m - 1500m.', order=4)
condition5 = Condition(condition='- Thời gian được tính từ lúc ….', order=5)

dai_truong = Member(name='Đài trưởng', order=1)
so1 = Member(name='Báo vụ số 1', order=2)
so2 = Member(name='Báo thoại số 2', order=3)
so3 = Member(name='Lái xe kiêm nhân viên nguồn điện số 3', order=4)

huan_luyen_ban_ngay = Type(name="Huấn luyện ban ngày")
huan_luyen_ban_dem = Type(name="Huấn luyện ban đêm")

huan_luyen_ban_ngay.contents = [
    Content(step='Xuất phát', order=1),
    Content(step='Lái xe cơ động qua các địa hình', order=1),
    Content(step='Triển khai xe', order=1),
    Content(step='Thực hành liên lạc', order=1),
    Content(step='Thu hồi xe', order=1),
    Content(step='Bắn súng', order=1),
    Content(step='Vượt chướng ngại vật', order=1),
    Content(step='Chạy 100m về đích', order=1),
    Content(step='Kết thúc', order=1),
]

huan_luyen_ban_dem.contents = [
    Content(step='Xuất phát', order=1),
    Content(step='Lái xe cơ động qua các địa hình', order=1),
    Content(step='Triển khai xe', order=1),
    Content(step='Thực hành liên lạc', order=1),
    Content(step='Thu hồi xe', order=1),
    Content(step='Bắn súng', order=1),
]

equipment1 = Equipment(name='Trang bị 1', order=1, unit='Cái', quantity=100)
equipment2 = Equipment(name='Trang bị 2', order=2, unit='Chiếc', quantity=10)

session.add_all([
    admin, user,
    condition1,
    condition2,
    condition3,
    condition4,
    condition5,
    dai_truong, so1, so2, so3,
    huan_luyen_ban_ngay, huan_luyen_ban_dem,
    equipment1,
    equipment2
])
session.commit()
session.close()
