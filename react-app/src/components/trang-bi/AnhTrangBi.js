import {
	ImageList,
	ImageListItem,
	Paper,
	Stack,
	Typography,
	Divider,
} from '@mui/material';

export default function AnhTrangBi({ itemData }) {
	return (
		<Paper elevation={3}>
			<Stack direction={'column'} alignItems={'center'} spacing={2} sx={{p: 4}}>
				{itemData.map((item, index) => (
					<Paper elevation={2}>
						<Stack direction={'column'} spacing={1}>
							<Typography variant="h6">{index===0?'Ảnh mang đeo trang bị phía trước': 'Ảnh mang đeo trang bị phía sau'}</Typography>
							<Divider />
                            <img
								src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
								srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
								style={{ height: '50vh' }}
								alt={item.title}
								loading="lazy"
							/>
						</Stack>
					</Paper>
				))}
			</Stack>
		</Paper>
	);
}
