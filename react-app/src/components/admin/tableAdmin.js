import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Paper } from '@mui/material';

const rows = [
	{
		id: 1,
		name: 'A',
		age: 25,
	},
	{
		id: 2,
		name: 'B',
		age: 36,
	},
];

export default function TableAdmin() {
	const columns = [
		{ field: 'name', headerName: 'Name', flex: 1 },
		{ field: 'age', headerName: 'Age', flex: 1 },
		{
			field: 'actions',
			headerName: 'Actions',
			flex: 1,
			type: 'actions',
			cellClassName: 'actions',
			getActions: ({ id }) => {
				return [
					<GridActionsCellItem
						icon={<EditIcon />}
						label="Edit"
						sx={{
							color: 'primary.main',
						}}
						onClick={handleEditClick(id)}
					/>,
					<GridActionsCellItem
						icon={<DeleteForeverIcon />}
						label="Delete"
						onClick={handleDeleteClick(id)}
						sx={{
							color: 'error.main',
						}}
					/>,
				];
			},
		},
	];
	const handleEditClick = (id) => () => {};

	const handleDeleteClick = (id) => () => {};
	
	return (
		<Paper>
			<DataGrid rows={rows} columns={columns} />
		</Paper>
	);
}
