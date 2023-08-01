import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Card, Stack, CardMedia } from '@mui/material';

export default function TabsNoiDung({ tabs }) {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Stack direction={'column'}>
			<Box
				sx={{
					flexGrow: 1,
					bgcolor: 'background.paper',
					display: 'flex',
				}}
			>
				<Tabs
					orientation="vertical"
					value={value}
					onChange={handleChange}
					aria-label="Vertical tabs example"
					sx={{
						borderRight: 1,
						borderColor: 'divider',
					}}
				>
					{tabs.map((tab, index) => {
						return (
							<Tab
								key={index}
								label={index + 1 + '. ' + tab.label}
								sx={{ alignItems: 'flex-start', textAlign: 'left' }}
							/>
						);
					})}
				</Tabs>

				{tabs.map((tab, index) => {
					return (
						<TabPanel
							key={index}
							value={value}
							index={index}
							src={tab.src}
						></TabPanel>
					);
				})}
			</Box>
		</Stack>
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
			{value === index && (
				<Box sx={{ p: 3}}>
					<Card sx={{width: '800px'}}>
						<CardMedia
							component="video"
							src={src}
							controls
						></CardMedia>
					</Card>
				</Box>
			)}
		</div>
	);
}
