import {
	Paper,
	Stack,
	Typography,
	Divider,
} from '@mui/material';
import { domain } from '../../config';

export default function AnhTrangBi({ membersData }) {
	return (
		<Paper elevation={3}>
			<Stack
				direction={'column'}
				alignItems={'center'}
				spacing={2}
				sx={{ p: 4 }}
			>
				<Paper elevation={2}>
					<Stack direction={'column'} spacing={1}>
						<Typography variant="h6">
							Ảnh mang đeo trang bị phía trước
						</Typography>
						<Divider />
						<img
							src={`${domain}images/${membersData?.img_url_1}?w=164&h=164&fit=crop&auto=format`}
							srcSet={`${domain}images/${membersData?.img_url_1}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
							style={{ height: '50vh' }}
							alt={
								'Ảnh mang đeo trang bị ' +
								membersData?.name +
								' phía trước'
							}
							loading="lazy"
						/>
					</Stack>
				</Paper>
				<Paper elevation={2}>
					<Stack direction={'column'} spacing={1}>
						<Typography variant="h6">
							Ảnh mang đeo trang bị phía sau
						</Typography>
						<Divider />
						<img
							src={`${domain}images/${membersData?.img_url_2}?w=164&h=164&fit=crop&auto=format`}
							srcSet={`${domain}images/${membersData?.img_url_2}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
							style={{ height: '50vh' }}
							alt={
								'Ảnh mang đeo trang bị ' +
								membersData?.name +
								' phía sau'
							}
							loading="lazy"
						/>
					</Stack>
				</Paper>
			</Stack>
		</Paper>
	);
}
