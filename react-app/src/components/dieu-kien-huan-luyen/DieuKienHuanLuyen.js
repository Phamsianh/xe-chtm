import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { getCondition } from '../../api/conditions';

export default function DieuKienHuanLuyen() {
	const [conditions, setConditions] = React.useState([]);

	React.useEffect(() => {
		getCondition().then((data) => setConditions(data));
	}, []);

	return (
		<Container>
			<List
				sx={{
					width: '800px',
					bgcolor: '#C8E4B2',
					m: 'auto',
					mt: '64px',
					p: 3
				}}
				component="nav"
			>
				<Typography variant='h4'>Điều kiện huấn luyện</Typography>
				{conditions.map((condition) => (
					<ListItemButton key={condition.id}>
						<ListItemIcon>{condition.icon}</ListItemIcon>
						<ListItemText primary={condition.condition} />
					</ListItemButton>
				))}
			</List>
		</Container>
	);
}
