from ORM.Model import *
from ORM.session import session

admin = User(username='admin', password='password',
             first_name='Admin', role='admin')
user = User(username='user', password='password',
            first_name='User', role='user')

condition1 = Condition(condition='- Đủ diện tích mặt bằng để bố trí bãi tập theo sơ đồ (Phụ lục I), thuận tiện cho việc cơ động, triển khai xe, tổ máy phát điện, anten không bị che khuất, đủ điều kiện thực hành các thao tác kỹ thuật, đấu nối tiếp hợp các phương tiện', order=1)
condition2 = Condition(
    condition='- Triển khai xe ngoài công sự hoặc trong công sự (đã được chuẩn bị từ trước) bảo đảm đúng yêu cầu kỹ thuật, chiến thuật; lợi dụng địa hình, địa vật, thuận tiện cho việc bảo đảm an toàn và phòng chống cháy nổ.', order=2)
condition3 = Condition(
    condition='- Trong mọi điều kiện thời tiết, ban ngày cũng như ban đêm.', order=3)
condition4 = Condition(condition='- Cự ly: 900m - 1500m.', order=4)
condition5 = Condition(condition='- Thời gian được tính từ lúc tổ đài nhận lệnh "Bắt đầu" đến khi cơ động về đích, đài trưởng tập hợp tổ đài, báo cáo chỉ huy.', order=5)

dai_truong = Member(name='Đài trưởng', order=1, note='02 Lựu đạn; 01 túi đựng lựu đạn; 01 bi đông; 01 túi phòng hóa; 01 túi đựng tài liệu; 01 đèn pin; 01 xẻng BB')
so1 = Member(name='Báo vụ số 1', order=2, note='02 Lựu đạn; 01 túi đựng lựu đạn; 01 bi đông; 01 túi phòng hóa; 01 đèn pin; 01 xẻng BB')
so2 = Member(name='Báo thoại số 2', order=3, note='02 Lựu đạn; 01 túi đựng lựu đạn; 01 bi đông; 01 túi phòng hóa; 01 đèn pin; 01 cuốc BB')
so3 = Member(name='Lái xe kiêm nhân viên nguồn điện số 3', order=4, note='01 súng tiểu liên AK, 01 bao xe AK, 03 hộp tiếp đạn (không có đạn), 01 bi đông, 01 túi phòng hóa, 01 xẻng BB')

huan_luyen_ban_ngay = Type(name="Huấn luyện ban ngày")
huan_luyen_ban_dem = Type(name="Huấn luyện ban đêm")

huan_luyen_ban_ngay.contents = [
    Content(step='Xuất phát', order=1),
    Content(step='Lái xe cơ động qua các địa hình', order=2),
    Content(step='Triển khai xe', order=3),
    Content(step='Thực hành liên lạc', order=4),
    Content(step='Thu hồi xe', order=5),
    Content(step='Bắn súng', order=6),
    Content(step='Vượt chướng ngại vật', order=7),
    Content(step='Chạy 100m về đích', order=8),
    Content(step='Kết thúc', order=9),
]

huan_luyen_ban_dem.contents = [
    Content(step='Xuất phát', order=1),
    Content(step='Lái xe cơ động qua các địa hình', order=2),
    Content(step='Triển khai xe', order=3),
    Content(step='Thực hành liên lạc', order=4),
    Content(step='Thu hồi xe', order=5),
    Content(step='Bắn súng', order=6),
]

equipment1 = Equipment(name='Máy VTĐsn VRS-631/S', order=1, unit=' ', quantity=1)
equipment2 = Equipment(name='Máy VTĐscn VRU-812/S (50W)', order=2, unit='Bộ', quantity=1)
equipment3 = Equipment(name="Bộ ĐKX máy VRU-812/S", order=3, unit='Bộ', quantity=1)
equipment4 = Equipment(name="Máy VTĐscn VRU-812 (10W)", order=4, unit='Bộ', quantity=1)
equipment5 = Equipment(name="Anten sóng ngắn NVIS", order=5, unit='Bộ', quantity=1)
equipment6 = Equipment(name="Anten 2 cực 44m", order=6, unit='Bộ', quantity=1)
equipment7 = Equipment(name="Anten cần sóng cực ngắn 3m", order=7, unit='Cái', quantity=1)
equipment8 = Equipment(name="Dây bọc điện thoại dã chiến", order=8, unit='km', quantity=0.1)
equipment9 = Equipment(name="Bộ nguồn kiêm nạp PSC-550", order=9, unit='Cái', quantity=1)
equipment10 = Equipment(name="Ắc quy Vision 12V/100Ah", order=10, unit='Bình', quantity=4)
equipment11 = Equipment(name="Tổ máy phát điện HONDA", order=11, unit='Bộ', quantity=1)
equipment12 = Equipment(name="Bình cứu hỏa MFZ-1", order=12, unit='Cái', quantity=1)

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
    equipment2,
    equipment3,
    equipment4,
    equipment5,
    equipment6,
    equipment7,
    equipment8,
    equipment9,
    equipment10,
    equipment11,
    equipment12,
])
session.commit()
session.close()
