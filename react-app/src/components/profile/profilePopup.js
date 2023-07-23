import { useState, useEffect } from 'react';
import { Popper, Typography, Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import { getCurrentCadres } from '../../api/cadres';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';

export default function ProfilePopup() {
	const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate()
	// useEffect(() => {
	// 	getCurrentCadres('me').then((data) => {
	// 		console.log(data);
	// 		setCurrentCadres(data);
	// 	});
	// }, []);
	const handleClick = (event) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const open = Boolean(anchorEl);

    const logout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('token_type')
        window.location.href = '/'
    }
	return (
		<>
			<Typography variant="body" fontSize={15}>
				Chào đồng chí Nguyen Van A
			</Typography>
			<IconButton color="inherit" onClick={handleClick}>
                <PersonIcon />
			</IconButton>

			<Popper open={open} anchorEl={anchorEl}>
				<Paper elevation={5} sx={{ mt: 2, mr: 2, p: 1, minWidth: 200 }}>
					<List component="nav" aria-label="mailbox folders">
						<ListItemButton onClick={() => navigate('/profile')}>
							<ListItemText primary="Hồ sơ" />
						</ListItemButton>
						<Divider />
						<ListItemButton onClick={logout}>
							<ListItemText primary="Đăng xuất" />
						</ListItemButton>
					</List>
				</Paper>
			</Popper>
		</>
	);
}
