import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';

const listItems = [
	{
		to: '/',
		primary: 'Trang Chủ',
		icon: <DashboardIcon />,
	},
	{
		to: '/bien-che',
		primary: 'Biên Chế',
		icon: <DashboardIcon />,
	},
	{
		to: '/trang-bi',
		primary: 'Trang Bị',
		icon: <DashboardIcon />,
	},
	{
		to: '/dieu-kien-huan-luyen',
		primary: 'Điều Kiện Huấn Luyện',
		icon: <DashboardIcon />,
	},
	{
		to: '/noi-dung-bai-tap',
		primary: 'Nội dung bài tập',
		icon: <DashboardIcon />,
	},
];

export const mainListItems = (
	<React.Fragment>
		{listItems.map((listItem) => (
			<Link to={listItem.to} style={{ textDecoration: 'none' }}>
				<ListItemButton>
					<ListItemIcon>
						{listItem.icon}
					</ListItemIcon>
					<ListItemText primary={listItem.primary} />
				</ListItemButton>
			</Link>
		))}
	</React.Fragment>
);
