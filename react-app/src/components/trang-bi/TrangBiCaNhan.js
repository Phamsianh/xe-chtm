import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Container, Paper, Grid } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AnhTrangBi from './AnhTrangBi';
import { getMember } from '../../api/members';

export default function TrangBiCaNhan() {
	const [selectedIndex, setSelectedIndex] = React.useState(0);
	const [membersData, setMembersData] = React.useState([{}]);
	const [anhTrangBi, setAnhTrangBi] = React.useState(
		<AnhTrangBi itemData={membersData} />
	);

	React.useEffect(() => {
		getMember().then((data) => {
			data = data.sort((a, b) => a.order - b.order)
			setMembersData(data);
			setAnhTrangBi(<AnhTrangBi membersData={data[selectedIndex]} />);
	});
	}, []);

	const handleListItemClick = (event, index) => {
		setSelectedIndex(index);
		setAnhTrangBi(<AnhTrangBi membersData={membersData[index]} />);
	};

	return (
		<Container>
			<Grid container spacing={2}>
				<Grid item xs={4}>
					<Paper
						elevation={3}
						sx={{ p: 2, bgcolor: '#C8E4B2', position: 'relative' }}
					>
						<List>
							{membersData.map((member, index) => {
								return (
									<ListItemButton
										selected={selectedIndex === index}
										onClick={(event) =>
											handleListItemClick(event, index)
										}
									>
										<ListItemAvatar>
											<Avatar>
												<PersonIcon />
											</Avatar>
										</ListItemAvatar>
										<ListItemText primary={member.name} />
									</ListItemButton>
								);
							})}
						</List>
					</Paper>
					<Paper
						elevation={3}
						sx={{ mt:2, p: 2, bgcolor: '#C8E4B2', position: 'relative' }}
					>
							Trang bị cá nhân: {membersData[selectedIndex].note}
					</Paper>
				</Grid>
				<Grid item xs={8}>
					{anhTrangBi}
				</Grid>
			</Grid>
		</Container>
	);
}
