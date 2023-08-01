import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Container, Typography, Stack, Paper } from '@mui/material';
import { getMember } from '../../api/members';

export default function BienChe() {
	const [bienche, setBienche] = React.useState([]);

	React.useEffect(() => {
		getMember().then(data => setBienche(data))
	}, [])
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
                    <Typography variant="h4">Biên chế gồm {bienche.length} đồng chí</Typography>
                    <List
                        sx={{
                            width: '600px',
                            bgcolor: 'background.paper',
                            mt: '20px',
                        }}
                    >
                        {bienche&&bienche.map((bienche, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={bienche.name} />
                            </ListItem>
                        ))}
                    </List>
                </Stack>
            </Paper>
		</Container>
	);
}
