import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TrangBiCaNhan from '../trang-bi/TrangBiCaNhan';
import AdminTrangBiTheoXe from './adminTrangBiTheoXe';

export default function TrangBiAdmin() {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={value} onChange={handleChange} centered>
					<Tab label="Trang Bị Theo Xe (Admin)" />
					<Tab label="Trang Bị Cá Nhân" />
				</Tabs>
			</Box>
			<TabPanel value={value} index={0}>
				<AdminTrangBiTheoXe />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<TrangBiCaNhan />
			</TabPanel>
		</Box>
	);
}

function TabPanel(props) {
	const { children, value, index } = props;

	return (
		<div hidden={value !== index}>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}
