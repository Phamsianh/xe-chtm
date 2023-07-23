import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import GavelIcon from '@mui/icons-material/Gavel';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import GroupsIcon from '@mui/icons-material/Groups';
import GridViewIcon from '@mui/icons-material/GridView';

<<<<<<< HEAD
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
=======
const listItems = [ 
 { 
  to: '/', 
  primary: 'Trang Chủ', 
  icon: <GridViewIcon />, 
 }, 
 { 
  to: '/bien-che', 
  primary: 'Biên Chế', 
  icon: <GroupsIcon />, 
 }, 
 { 
  to: '/trang-bi', 
  primary: 'Trang Bị', 
  icon: <HomeRepairServiceIcon />, 
 }, 
 { 
  to: '/dieu-kien-huan-luyen', 
  primary: 'Điều Kiện Huấn Luyện', 
  icon: <GavelIcon />, 
 }, 
 { 
  to: '/noi-dung-bai-tap', 
  primary: 'Nội dung bài tập', 
  icon: <LibraryBooksIcon />, 
 }, 
 { 
  to: '/Profile', 
  primary: 'Profile', 
  icon: <AccountCircleIcon />, 
 }, 
]; 
 
export const mainListItems = ( 
 <React.Fragment> 
  {listItems.map((listItem) => ( 
   <Link to={listItem.to} style={{textDecoration: 'none', color:'white'}}> 
    <ListItemButton> 
     <ListItemIcon style={{color:'white'}}> 
      {listItem.icon} 
     </ListItemIcon> 
     <ListItemText primary={listItem.primary} /> 
    </ListItemButton> 
   </Link> 
  ))} 
 </React.Fragment> 
);
>>>>>>> 32e3cf0722b03d2883c03482c8a0e8ebf989f1cf
