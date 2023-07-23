import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Container, Typography, Stack, Paper } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

export default function BienChe() {
	const listItems = [
		{
			primary: 'Đài Trưởng',
			icon: <PersonIcon />,
		},
		{
			primary: 'Báo vụ số 1',
			icon: <ContactMailIcon />,
		},
		{
			primary: 'Báo thoại số 2',
			icon: <ContactPhoneIcon />,
		},
		{
			primary: 'Lái xe kiêm nhân viên nguồn điện số 3',
			icon: <LocalShippingIcon />,
		},
	];
	return (
		<Container
			sx={{
				display: 'flex',
				justifyContent: 'center',
				mt: '20px',
			}}
		>
            <Paper sx={{p: 2}}>
                <Stack>
                    <Typography variant="h4">Biên chế gồm 4 đồng chí</Typography>
                    <List
                        sx={{
                            width: '600px',
                            bgcolor: 'background.paper',
                            mt: '20px',
                        }}
                    >
                        {listItems.map((listItem) => (
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>{listItem.icon}</Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={listItem.primary} />
                            </ListItem>
                        ))}
                    </List>
                </Stack>
            </Paper>
		</Container>
	);
}
