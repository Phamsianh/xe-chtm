import * as React from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {
	DataGrid,
	GridActionsCellItem,
	GridToolbarContainer,
} from '@mui/x-data-grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteCondition, getCondition, postCondition, putCondition } from '../../api/conditions';

export default function DieuKienHuanLuyenAdmin() {
	const columns = [
		{ field: 'id', headerName: 'ID' },
		{ field: 'order', headerName: 'Thứ tự hiển thị', flex: 0.2 },
		{ field: 'condition', headerName: 'Điều kiện huấn luyện', flex: 1 },
		{
			field: 'actions',
			headerName: 'Actions',
			width: 90,
			type: 'actions',
			cellClassName: 'actions',
			getActions: ({ row }) => {
				return [
					<GridActionsCellItem
						icon={<EditIcon />}
						label="Edit"
						onClick={() => {
							setOpenEditForm(true);
							setOldConditionData(row);
						}}
						sx={{
							color: 'primary.main',
						}}
					/>,
					<GridActionsCellItem
						icon={<DeleteForeverIcon />}
						label="Delete"
						onClick={() => handleDeleteClick(row)}
						sx={{
							color: 'error.main',
						}}
					/>,
				];
			},
		},
	];
	const [conditions, setConditions] = React.useState([]);
	const [oldConditionData, setOldConditionData] = React.useState({});
	const [openAddForm, setOpenAddForm] = React.useState(false);
	const [openEditForm, setOpenEditForm] = React.useState(false);

	React.useEffect(() => {
		getCondition().then((data) => setConditions(data.sort((a, b) => a.order - b.order)));
	}, []);

	async function handleDeleteClick(row) {
		const data = await deleteCondition(row.id);
		if (data !== null) {
			alert('Cơ sở dữ liệu cập nhật không thành công!');
			return;
		}
		setConditions(conditions.filter((e) => e.id !== row.id));
	}

	return (
		<>
			<Paper sx={{m: 3}}>
				<DataGrid
					rows={conditions}
					columns={columns}
					initialState={{
						columns: {
							columnVisibilityModel: {
								id: false,
							},
						},
					}}
					pageSizeOptions={[5]}
					disableRowSelectionOnClick
					slots={{
						toolbar: () => (
							<GridToolbarContainer>
								<Button
									color="primary"
									startIcon={<AddIcon />}
									onClick={() => setOpenAddForm(true)}
								>
									Thêm điều kiện huấn luyện
								</Button>
							</GridToolbarContainer>
						),
					}}
				/>
			</Paper>
			<AddConditionForm
				openAddForm={openAddForm}
				setOpenAddForm={setOpenAddForm}
				conditionsData={conditions}
				setConditionsData={setConditions}
			/>
			<EditConditionForm
				openEditForm={openEditForm}
				setOpenEditForm={setOpenEditForm}
				conditionsData={conditions}
				setConditionsData={setConditions}
				oldConditionData={oldConditionData}
			/>
		</>
	);
}

function AddConditionForm({
	openAddForm,
	setOpenAddForm,
	conditionsData,
	setConditionsData,
}) {
	async function handleAddMember(e) {
		e.preventDefault();
		const req_bod = {
			condition: e.target.condition.value,
			order: e.target.order.value,
		};
		const data = await postCondition(req_bod);
		setConditionsData([...conditionsData, data].sort((a, b) => a.order - b.order));
		setOpenAddForm(false);
	}

	const handleCloseAddForm = () => {
		setOpenAddForm(false);
	};

	return (
		<Dialog open={openAddForm} onClose={handleCloseAddForm}>
			<form onSubmit={handleAddMember}>
				<DialogTitle>Thêm điều kiện huấn luyên</DialogTitle>
				<DialogContent>
					<Stack spacing={3} minWidth={500}>
						<TextField
							autoFocus
							id="condition"
							label="Điều kiện huấn luyện"
							fullWidth
							variant="standard"
							required
							defaultValue={`Điều kiện ${conditionsData?.length + 1}`}
						/>
						<TextField
							id="order"
							label="Thứ tự hiển thị"
							fullWidth
							variant="standard"
							type="number"
							required
							defaultValue={conditionsData?.length + 1}
						/>
					</Stack>
				</DialogContent>
				<DialogActions>
					<Button type="submit">Thêm</Button>
					<Button onClick={handleCloseAddForm}>Hủy</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}

function EditConditionForm({
	openEditForm,
	setOpenEditForm,
	conditionsData,
	setConditionsData,
	oldConditionData,
}) {
	async function handleAddMember(e) {
		e.preventDefault();
		const req_bod = {
			condition: e.target.condition.value,
			order: e.target.order.value,
		};
		console.log(req_bod);
		const data = await putCondition(oldConditionData.id, req_bod);
		setConditionsData(
			conditionsData.map((e) => (e.id === data.id ? data : e)).sort((a, b) => a.order - b.order)
		);
		setOpenEditForm(false);
	}

	const handleCloseEditForm = () => {
		setOpenEditForm(false);
	};

	return (
		<Dialog open={openEditForm} onClose={handleCloseEditForm}>
			<form onSubmit={handleAddMember}>
				<DialogTitle>Sửa điều kiện huấn luyện</DialogTitle>
				<DialogContent>
					<Stack spacing={3} minWidth={500}>
						<TextField
							autoFocus
							id="condition"
							label="Điều kiện huấn luyện"
							fullWidth
							variant="standard"
							required
							defaultValue={oldConditionData?.condition}
						/>
						<TextField
							id="order"
							label="Thứ tự hiển thị"
							fullWidth
							variant="standard"
							type="number"
							required
							defaultValue={oldConditionData?.order}
						/>
					</Stack>
				</DialogContent>
				<DialogActions>
					<Button type="submit">Lưu</Button>
					<Button onClick={handleCloseEditForm}>Hủy</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}
