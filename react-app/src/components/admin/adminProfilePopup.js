import { useState, useEffect } from 'react';
import { Popper, Typography, Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../api/users';

export default function ProfilePopupAdmin() {
	const [anchorEl, setAnchorEl] = useState(null);
	const [currentUser, setCurrentUser] = useState(null);
	const navigate = useNavigate();
	useEffect(() => {
		getMe().then((data) => {
			console.log(data);
			setCurrentUser(data);
		}).catch(e => logout());
	}, []);
	const handleClick = (event) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const open = Boolean(anchorEl);

	const logout = () => {
		localStorage.removeItem('access_token');
		localStorage.removeItem('token_type');
		window.location.href = '/';
	};

	return (
		<>
			{currentUser && (
				<Typography variant="body" fontSize={15}>
					Chào đồng chí {currentUser?.first_name}{' '}
					{currentUser?.last_name}
				</Typography>
			)}
			<IconButton color="inherit" onClick={handleClick}>
				<PersonIcon />
			</IconButton>

			<Popper open={open} anchorEl={anchorEl}>
				<Paper elevation={5} sx={{ mt: 2, mr: 2, p: 1, minWidth: 200 }}>
					<List component="nav" aria-label="mailbox folders">
						{currentUser && (
							<>
								<ListItemButton
									onClick={() => navigate('/profile')}
								>
									<ListItemText primary="Hồ sơ" />
								</ListItemButton>
								<Divider />
							</>
						)}
						{currentUser && (
							<ListItemButton onClick={logout}>
								<ListItemText primary="Đăng xuất" />
							</ListItemButton>
						)}
					</List>
				</Paper>
			</Popper>
		</>
	);
}
