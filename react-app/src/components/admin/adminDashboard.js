import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems } from './listItems';
import { Route, Routes } from 'react-router-dom';
import TrangChu from '../trang-chu/TrangChu';
import SignIn from '../sign-in/SignIn';
import BienCheAdmin from './adminBienche';
import DieuKienHuanLuyenAdmin from './adminDieuKienHuanLuyen';
import TrangBiAdmin from './adminTrangBi';
import UploadImage from './adminUploadImage';
import UploadVideo from './adminUploadVideo';
import NoiDungBaiTapAdmin from './adminNoiDungBaiTap';
import ProfilePopupAdmin from './adminProfilePopup';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	'& .MuiDrawer-paper': {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		backgroundColor: '#29502c',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		boxSizing: 'border-box',
		...(!open && {
			overflowX: 'hidden',
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing(7),
			[theme.breakpoints.up('sm')]: {
				width: theme.spacing(9),
			},
		}),
	},
}));

const mdTheme = createTheme();

function DashboardContent() {
	const [open, setOpen] = React.useState(true);
	const toggleDrawer = () => {
		setOpen(!open);
	};

	return (
		<ThemeProvider theme={mdTheme}>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<AppBar position="absolute" open={open}>
					<Toolbar
						sx={{
							pr: '24px', // keep right padding when drawer closed
							backgroundColor: '#0b591b',
						}}
					>
						<IconButton
							edge="start"
							color="inherit"
							aria-label="open drawer"
							onClick={toggleDrawer}
							sx={{
								marginRight: '36px',
								...(open && { display: 'none' }),
							}}
						>
							<MenuIcon />
						</IconButton>
						<img src="/images/bctt192.png" alt="logo" width={50} />
						<Typography
							component="h1"
							variant="h6"
							color="inherit"
							noWrap
							sx={{ flexGrow: 1 }}
						>
							<strong>ADMIN LỮ ĐOÀN THÔNG TIN 205</strong>
							<br />
							KỊP THỜI - CHÍNH XÁC - BÍ MẬT – AN TOÀN
						</Typography>
						<ProfilePopupAdmin />
					</Toolbar>
				</AppBar>
				<Drawer
					variant="permanent"
					open={open}
					sx={{
						backgroundColor: '#29502c',
					}}
				>
					<Toolbar
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-end',
							px: [1],
						}}
					>
						<IconButton onClick={toggleDrawer}>
							<ChevronLeftIcon style={{ color: 'white' }} />
						</IconButton>
					</Toolbar>
					<Divider />
					<List component="nav">{mainListItems}</List>
				</Drawer>
				<Box
					component="main"
					sx={{
						flexGrow: 1,
						height: '100vh',
						overflow: 'auto',
						position: 'relative',
					}}
				>
					<Toolbar />
					<ImageList
						sx={{
							width: '100%',
							height: '100vh',
							overflow: 'hidden',
							position: 'absolute',
							top: 0,
							zIndex: -1,
							opacity: 0.1,
							textAlign: 'center',
						}}
						cols={1}
						rowHeight={'auto'}
					>
						<ImageListItem key={'background1.svg'}>
							<img
								src="/images/background1.svg"
								srcSet="/images/background1.svg"
								alt="/images/background1.svg"
								loading="lazy"
								style={{
									position: 'absolute',
									top: '50%',
									transform: 'translateY(-50%)',
								}}
							/>
						</ImageListItem>
					</ImageList>
					<Routes>
						<Route path="/" element={<TrangChu />} />
						<Route path="/login" element={<SignIn />} />
						<Route path="/bien-che" element={<BienCheAdmin />} />
						<Route path="/trang-bi" element={<TrangBiAdmin />} />
						<Route
							path="/dieu-kien-huan-luyen"
							element={<DieuKienHuanLuyenAdmin />}
						/>
						<Route
							path="/noi-dung-bai-tap"
							element={<NoiDungBaiTapAdmin />}
						/>
						<Route path="/profile" element={<div>Profile</div>} />
						<Route
							path="/upload_images"
							element={<UploadImage />}
						/>
						<Route
							path="/upload_videos"
							element={<UploadVideo />}
						/>
					</Routes>
				</Box>
			</Box>
		</ThemeProvider>
	);
}

export default function DashboardAdmin() {
	return <DashboardContent />;
}
