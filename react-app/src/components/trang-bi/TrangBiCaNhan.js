import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Container, Paper, Grid } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AnhTrangBi from './AnhTrangBi';

export default function TrangBiCaNhan() {
	const [selectedIndex, setSelectedIndex] = React.useState(1);
	const mockItemData = [
		[
			{
				title: 'Ảnh mang đeo trang bị Đài trưởng phía trước',
				img: '/images/mang-deo-trang-bi-truoc.jpg',
			},
			{
				title: 'Ảnh mang đeo trang bị Đài trưởng phía sau',
				img: '/images/mang-deo-trang-bi-sau.jpg',
			},
		],
		[
			{
				title: 'Ảnh mang đeo trang bị Báo vụ số 1 phía trước',
				img: '/images/mang-deo-trang-bi-truoc1.jpg',
			},
			{
				title: 'Ảnh mang đeo trang bị Báo vụ số 1 phía sau',
				img: '/images/mang-deo-trang-bi-sau1.jpg',
			},
		],
		[
			{
				title: 'Ảnh mang đeo trang bị Báo thoại số 2 phía trước',
				img: '/images/mang-deo-trang-bi-truoc.jpg',
			},
			{
				title: 'Ảnh mang đeo trang bị Báo thoại số 2 phía sau',
				img: '/images/mang-deo-trang-bi-sau.jpg',
			},
		],
		[
			{
				title: 'Ảnh mang đeo trang bị Báo thoại số 2 phía trước',
				img: '/images/mang-deo-trang-bi-truoc1.jpg',
			},
			{
				title: 'Ảnh mang đeo trang bị Báo thoại số 2 phía sau',
				img: '/images/mang-deo-trang-bi-sau1.jpg',
			},
		],
	];
	const [itemData, setItemData] = React.useState(mockItemData[0]);
	const [anhTrangBi, setAnhTrangBi] = React.useState(
		<AnhTrangBi itemData={itemData} />
	);

	const handleListItemClick = (event, index) => {
		setSelectedIndex(index);
		setItemData(mockItemData[index]);
		setAnhTrangBi(<AnhTrangBi itemData={mockItemData[index]} />);
	};

	return (
		<Container>
			<Grid container spacing={2}>
				<Grid item xs={4}>
					<Paper elevation={3} sx={{p: 2}}>
						<List
							sx={{
								// width: '100%',
								bgcolor: 'background.paper',
							}}
						>
							<ListItemButton
								selected={selectedIndex === 0}
								onClick={(event) =>
									handleListItemClick(event, 0)
								}
							>
								<ListItemAvatar>
									<Avatar>
										<PersonIcon />
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary="Đài Trưởng" />
							</ListItemButton>
							<ListItemButton
								selected={selectedIndex === 1}
								onClick={(event) =>
									handleListItemClick(event, 1)
								}
							>
								<ListItemAvatar>
									<Avatar>
										<ContactMailIcon />
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary="Báo vụ số 1" />
							</ListItemButton>
							<ListItemButton
								selected={selectedIndex === 2}
								onClick={(event) =>
									handleListItemClick(event, 2)
								}
							>
								<ListItemAvatar>
									<Avatar>
										<ContactPhoneIcon />
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary="Báo thoại số 2" />
							</ListItemButton>
							<ListItemButton
								selected={selectedIndex === 3}
								onClick={(event) =>
									handleListItemClick(event, 3)
								}
							>
								<ListItemAvatar>
									<Avatar>
										<LocalShippingIcon />
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary="Lái xe kiêm nhân viên nguồn điện số 3" />
							</ListItemButton>
						</List>
					</Paper>
				</Grid>
				<Grid item xs={8}>
					{anhTrangBi}
				</Grid>
			</Grid>
		</Container>
	);
}
