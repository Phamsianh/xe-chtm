import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Container } from '@mui/material';
import { getCondition } from '../../api/conditions';

export default function DieuKienHuanLuyen() {
    const [conditions, setConditions] = React.useState([]);

    React.useEffect(() => {
        getCondition().then(data => setConditions(data));
    }, [])

	return (
		<Container >
				<List
					sx={{
						width: '100%',
						maxWidth: 360,
						bgcolor: 'background.paper',
						m: 'auto',
						mt: '64px'
					}}
					component="nav"
					aria-labelledby="nested-list-subheader"
					subheader={
						<ListSubheader
							component="div"
							id="nested-list-subheader"
						>
							Điều kiện huấn luyện
						</ListSubheader>
					}
				>
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
