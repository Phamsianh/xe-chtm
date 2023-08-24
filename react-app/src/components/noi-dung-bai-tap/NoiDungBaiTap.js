import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabsNoiDung from './TabsNoiDung';
import { getContentByType } from '../../api/contents';

const typeIdDay = 1;
const typeIdNight = 2;

export default function NoiDungBaiTap() {
	const [value, setValue] = React.useState(0);
	const [contentsDay, setContentsDay] = React.useState([]);
	const [contentsNight, setContentsNight] = React.useState([]);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	
	React.useEffect(() => {
		getContentByType(typeIdDay).then(data => {
			setContentsDay(data)
		})
		getContentByType(typeIdNight).then(data => {
			setContentsNight(data)
		})
	}, [])

	return (
		<Box
			sx={{
				width: '100%',
				bgcolor: 'background.paper',
                justifyContent: 'center',
				height: '100vh'
			}}
		>
			<Tabs
				value={value}
				onChange={handleChange}
				sx={{
					borderBottom: 1,
					borderColor: 'divider',
					width: '100%',
				}}
                centered
			>
				<Tab label="Huấn luyện ban ngày" />
				<Tab label="Huấn luyện ban đêm" />
			</Tabs>

			<TabPanel value={value} index={0}>
				<TabsNoiDung tabs={contentsDay} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<TabsNoiDung tabs={contentsNight} />
			</TabPanel>
		</Box>
	);
}

function TabPanel(props) {
	const { children, value, index, src, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}
