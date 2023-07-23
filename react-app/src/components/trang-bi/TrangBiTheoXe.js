import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
	{ field: 'id', headerName: 'STT', width: 90 },
	{
		field: 'equipment_name',
		headerName: 'TÊN TRANG BỊ',
		flex: 1,
		editable: true,
	},
	{
		field: 'unit',
		headerName: 'ĐƠN VỊ TÍNH',
		flex: 1,
		editable: true,
	},
	{
		field: 'quantity',
		headerName: 'SỐ LƯỢNG TÍNH',
		type: 'number',
		flex: 1,
		editable: true,
	},
];

const rows = [
	{ id: 1, equipment_name: 'Trang Bị 1', unit: 'cái', quantity: 35 },
	{ id: 2, equipment_name: 'Trang Bị 2', unit: 'cái', quantity: 42 },
	{ id: 3, equipment_name: 'Trang Bị 3', unit: 'cái', quantity: 45 },
	{ id: 4, equipment_name: 'Trang Bị 4', unit: 'cái', quantity: 16 },
	{ id: 5, equipment_name: 'Trang Bị 5', unit: 'cái', quantity: 10 },
	{ id: 6, equipment_name: 'Trang Bị 6', unit: 'cái', quantity: 150 },
	{ id: 7, equipment_name: 'Trang Bị 7', unit: 'cái', quantity: 44 },
	{ id: 8, equipment_name: 'Trang Bị 8', unit: 'cái', quantity: 36 },
	{ id: 9, equipment_name: 'Trang Bị 9', unit: 'cái', quantity: 65 },
];

export default function TrangBiTheoXe() {
	return (
		<Box sx={{ height: 400, width: '100%' }}>
			<Paper>
				<DataGrid
					rows={rows}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 5,
							},
						},
					}}
					pageSizeOptions={[5]}
					disableRowSelectionOnClick
				/>
			</Paper>
		</Box>
	);
}
