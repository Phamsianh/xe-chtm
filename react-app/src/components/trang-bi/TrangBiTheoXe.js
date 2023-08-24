import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { getEquipment } from '../../api/equipments';
import { Container } from '@mui/material';

const columns = [
	{ field: 'id', headerName: 'ID', width: 90 },
	{ field: 'order', headerName: 'STT', width: 90 },
	{
		field: 'name',
		headerName: 'TÊN TRANG BỊ',
		flex: 1,
		editable: true,
	},
	{
		field: 'unit',
		headerName: 'ĐƠN VỊ TÍNH',
		flex: 0.3,
		editable: true,
	},
	{
		field: 'quantity',
		headerName: 'SỐ LƯỢNG TÍNH',
		type: 'number',
		flex: 0.3,
		editable: true,
	},
];

export default function TrangBiTheoXe() {
	const [trangbi, setTrangbi] = React.useState([])

	React.useEffect(() => {
		getEquipment().then(data => setTrangbi(data))
	}, [])

	return (
		<Container sx={{ width: '900px'}}>
			<Paper sx={{bgcolor: '#C8E4B2' }}>
				<DataGrid
					rows={trangbi}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 25,
							},
						},
						columns: {
							columnVisibilityModel: {
							  id: false,
							},
						  },
					}}
					pageSizeOptions={[5, 10, 25]}
					disableRowSelectionOnClick
				/>
			</Paper>
		</Container>
	);
}
