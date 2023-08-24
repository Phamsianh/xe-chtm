import { Box, Container, Typography } from '@mui/material';

export default function TrangChu() {
	return (
		<Container
			sx={{
				height: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Typography variant={'h3'} sx={{
				position: 'fixed',
				top: '50%',
				transform: 'translateY(-50%)'
			}}>
				<strong>
					PHẦN MỀM HUẤN LUYỆN BÀI TẬP TỔNG HỢP <br />
					ĐỐI VỚI TỔ ĐÀI XE CTHM
				</strong>
			</Typography>
		</Container>
	);
}
