import { ImageList, ImageListItem, Stack } from '@mui/material';

export default function AnhTrangBi({ itemData }) {
	return (
		<Stack direction={'column'} alignItems={'center'}>
			{itemData.map((item) => (
				<img
					src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
					srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    width={'400px'}
					alt={item.title}
					loading="lazy"
				/>
			))}
		</Stack>
	);
}
