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
import ProfilePopup from '../profile/profilePopup';
import BienChe from '../bien-che/BienChe';
import TrangBi from '../trang-bi/TrangBi';
import DieuKienHuanLuyen from '../dieu-kien-huan-luyen/DieuKienHuanLuyen';
import NoiDungBaiTap from '../noi-dung-bai-tap/NoiDungBaiTap';
import TrangChu from '../trang-chu/TrangChu';
import { ImageList, ImageListItem } from '@mui/material';

const drawerWidth = 240;
const toolbarHeight = 120;

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
							// backgroundColor: '#0b591b',
							background: 'rgb(255,0,0)',
							background:
								'radial-gradient(circle, rgba(255,0,0,0.5) 0%, rgba(240,255,49,0.5) 50%, rgba(11,89,27,1) 100%)',
							height: toolbarHeight,
							disableGutters: false
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
						<img src="/images/bctt192.png" alt="logo" width={100} style={{borderRadius: '2px'}}/>
						<Typography
							component="h1"
							variant="h4"
							color="inherit"
							noWrap
							sx={{ flexGrow: 1 }}
						>
							<strong>LỮ ĐOÀN THÔNG TIN 205</strong>
							<br />
							KỊP THỜI - CHÍNH XÁC - BÍ MẬT – AN TOÀN
						</Typography>
						<ProfilePopup />
						<div class="background-navbar" style={{
							position: 'absolute',
							top: 0,
							left:0,
							width: '100%',
							height: '100%',
							backgroundImage: 'url(/images/background1.svg)',
							backgroundPosition: '50% 50%',
							opacity: 0.3,
							zIndex: -1
						}}></div>
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
							height: toolbarHeight,
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
					<div style={{height: toolbarHeight, zIndex: -1, width: '100%'}}></div>
					<ImageList
						sx={{
							width: '100%',
							height: '100vh',
							overflow: 'hidden',
							position: 'fixed',
							top: 0,
							left: 0,
							zIndex: -1,
							opacity: 0.5,
						}}
						cols={2}
						rowHeight={'auto'}
					>
						{[
							'/images/anh-trang-chu.jpg',
							'/images/anh-trang-chu1.jpg',
							'/images/anh-trang-chu2.jpg',
							'/images/anh-trang-chu3.jpg',
						].map((item) => (
							<ImageListItem
								key={item}
								sx={{
									height: '50vh !important',
									overflow: 'hidden',
								}}
							>
								<img
									src={`${item}`}
									srcSet={`${item}`}
									alt={item}
									loading="lazy"
								/>
							</ImageListItem>
						))}
					</ImageList>
					<Routes>
						<Route path="/" element={<TrangChu />} />
						<Route path="/bien-che" element={<BienChe />} />
						<Route path="/trang-bi" element={<TrangBi />} />
						<Route
							path="/dieu-kien-huan-luyen"
							element={<DieuKienHuanLuyen />}
						/>
						<Route
							path="/noi-dung-bai-tap"
							element={<NoiDungBaiTap />}
						/>
						<Route path="/profile" element={<div>Profile</div>} />
					</Routes>
				</Box>
			</Box>
		</ThemeProvider>
	);
}

export default function Dashboard() {
	return <DashboardContent />;
}
