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
import { Container } from '@mui/material';

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
							backgroundColor:'#0b591b',
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
						<Typography
							component="h1"
							variant="h6"
							color="inherit"
							noWrap
							sx={{ flexGrow: 1 }}
						>
							<strong>LỮ ĐOÀN THÔNG TIN 205</strong>
							<br />
							KỊP THỜI - CHÍNH XÁC - BÍ MẬT – AN TOÀN
						</Typography>
						<ProfilePopup />
					</Toolbar>
				</AppBar>
				<Drawer variant="permanent" open={open} sx={{
							backgroundColor:'#29502c',
				}}>
					<Toolbar
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-end',
							px: [1],
						}}
					>
						<IconButton onClick={toggleDrawer}>
							<ChevronLeftIcon style={{color:'white'}}/>
						</IconButton>
					</Toolbar>
					<Divider />
					<List component="nav">{mainListItems}</List>
				</Drawer>
				<Box
					component="main"
					sx={{
						backgroundColor: (theme) =>
							theme.palette.mode === 'light'
								? theme.palette.grey[100]
								: theme.palette.grey[900],
						flexGrow: 1,
						height: '100vh',
						overflow: 'auto',
					}}
				>
					<Toolbar />
					<Container
						sx={{
							position: 'fixed',
							width: '100%',
							maxWidth:'none !important',
							height: '100vh',
							backgroundImage: 'url("/images/background1.svg")',
							backgroundRepeat: 'no-repeat',
							backgroundAttachment: 'fixed',
							backgroundSize: 'inherit',
							backgroundPosition: 'center',
							opacity: 0.1,
						}}
					>
					</Container>
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
							<Route
								path="/profile"
								element={<div>Profile</div>}
							/>
						</Routes>
				</Box>
			</Box>
		</ThemeProvider>
	);
}

export default function Dashboard() {
	return <DashboardContent />;
}
