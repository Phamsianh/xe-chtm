import { useState } from 'react';
import { Popper, Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function ProfilePopup() {
	const [anchorEl, setAnchorEl] = useState(null);
	const handleClick = (event) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const open = Boolean(anchorEl);

	const login = () => {
		window.location.href = '/login';
	};

	return (
		<>
			<IconButton color="inherit" onClick={handleClick}>
				<PersonIcon />
			</IconButton>

			<Popper open={open} anchorEl={anchorEl}>
				<Paper elevation={5} sx={{ mt: 2, mr: 2, p: 1, minWidth: 200 }}>
					<List component="nav" aria-label="Sign-In">
						<ListItemButton onClick={login}>
							<ListItemText primary="Đăng nhập" />
						</ListItemButton>
					</List>
				</Paper>
			</Popper>
		</>
	);
}
