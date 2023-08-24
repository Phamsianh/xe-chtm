import * as React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { Container, Typography, Stack, Paper, ListItemButton } from '@mui/material';
import { getMember } from '../../api/members';

export default function BienChe() {
	const [bienche, setBienche] = React.useState([]);

	React.useEffect(() => {
		getMember().then((data) => setBienche(data));
	}, []);
	return (
		<Container
			sx={{
				display: 'flex',
				justifyContent: 'center',
				mt: '64px',
			}}
		>
			<Paper
				sx={{p: 3, bgcolor: '#C8E4B2'}}
			>
				<Stack>
					<Typography variant="h4">
						Biên chế gồm {bienche.length} đồng chí
					</Typography>
					<List
						sx={{
							width: '800px',
							mt: '20px',
						}}
					>
						{bienche &&
							bienche.map((bienche, index) => (
								<ListItemButton key={index}>
									<ListItemText primary={bienche.name} />
								</ListItemButton>
							))}
					</List>
				</Stack>
			</Paper>
		</Container>
	);
}
