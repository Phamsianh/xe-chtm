import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {
	DataGrid,
	GridActionsCellItem,
	GridToolbarContainer,
} from '@mui/x-data-grid';
import { deleteEquipment, getEquipment, postEquipment, putEquipment } from '../../api/equipments';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AdminTrangBiTheoXe() {
	const columns = [
		{ field: 'id', headerName: 'ID', width: 90 },
		{ field: 'order', headerName: 'Thứ tự hiển thị', flex: 1 },
		{
			field: 'name',
			headerName: 'TÊN TRANG BỊ',
			flex: 1,
		},
		{
			field: 'unit',
			headerName: 'ĐƠN VỊ TÍNH',
			flex: 1,
		},
		{
			field: 'quantity',
			headerName: 'SỐ LƯỢNG TÍNH',
			type: 'number',
			flex: 1,
		},
		{
			field: 'actions',
			headerName: 'Actions',
			flex: 1,
			type: 'actions',
			cellClassName: 'actions',
			getActions: ({ row }) => {
				return [
					<GridActionsCellItem
						icon={<EditIcon />}
						label="Edit"
						onClick={() => {
							setOpenEditForm(true)
							setOldEquipmentData(row)
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
	const [trangbi, setTrangbi] = React.useState([]);
	const [oldEquipmentData, setOldEquipmentData] = React.useState({});
	const [openAddForm, setOpenAddForm] = React.useState(false);
	const [openEditForm, setOpenEditForm] = React.useState(false);


	React.useEffect(() => {
		getEquipment().then((data) => setTrangbi(data));
	}, []);

	async function handleDeleteClick(row) {
		const data = await deleteEquipment(row.id);
		if(data !== null){
			alert('Cơ sở dữ liệu cập nhật không thành công!')
			return
		}
		setTrangbi(trangbi.filter(e => e.id !== row.id))
	}

	return (
		<Box sx={{ height: 400, width: '100%' }}>
			<Paper>
				<DataGrid
					rows={trangbi}
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
									Thêm trang bi
								</Button>
							</GridToolbarContainer>
						),
					}}
				/>
			</Paper>
			<AddEquipmentForm
				openAddForm={openAddForm}
				setOpenAddForm={setOpenAddForm}
				equipmentsData={trangbi}
				setEquipmentsData={setTrangbi}
			/>
			<EditEquipmentForm
				openEditForm={openEditForm}
				setOpenEditForm={setOpenEditForm}
				equipmentsData={trangbi}
				setEquipmentsData={setTrangbi}
				oldEquipmentData={oldEquipmentData}
			/>
		</Box>
	);
}

function AddEquipmentForm({
	openAddForm,
	setOpenAddForm,
	equipmentsData,
	setEquipmentsData,
}) {
	async function handleAddMember(e) {
		e.preventDefault();
		const req_bod = {
			name: e.target.name.value,
			order: e.target.order.value,
			quantity: e.target.quantity.value,
			unit: e.target.unit.value,
		};
		const data = await postEquipment(req_bod);
		setEquipmentsData(
			[...equipmentsData, data].sort((a, b) => a.order - b.order)
		);
		setOpenAddForm(false);
	}

	const handleCloseAddForm = () => {
		setOpenAddForm(false);
	};

	return (
		<Dialog open={openAddForm} onClose={handleCloseAddForm}>
			<form onSubmit={handleAddMember}>
				<DialogTitle>Thêm trang bị</DialogTitle>
				<DialogContent>
					<Stack spacing={3} minWidth={500}>
						<TextField
							autoFocus
							id="name"
							label="Tên trang bị"
							fullWidth
							variant="standard"
							required
						/>
						<TextField
							id="order"
							label="Thứ tự hiển thị"
							type="number"
							fullWidth
							variant="standard"
							required
							defaultValue={equipmentsData?.length + 1}
						/>
						<TextField
							id="unit"
							label="Đơn vị tính"
							fullWidth
							variant="standard"
							required
							defaultValue={'Cái'}
						/>
						<TextField
							id="quantity"
							label="Số lượng"
							fullWidth
							variant="standard"
							type="number"
							required
							defaultValue={1}
						/>
					</Stack>
				</DialogContent>
				<DialogActions>
					<Button type="submit">Add</Button>
					<Button onClick={handleCloseAddForm}>Close</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}

function EditEquipmentForm({
	openEditForm,
	setOpenEditForm,
	equipmentsData,
	setEquipmentsData,
	oldEquipmentData,
}) {
	async function handleAddMember(e) {
		e.preventDefault();
		const req_bod = {
			name: e.target.name.value,
			order: e.target.order.value,
			quantity: e.target.quantity.value,
			unit: e.target.unit.value,
		};
		const data = await putEquipment(oldEquipmentData.id, req_bod);
		setEquipmentsData(
			equipmentsData.map(e => e.id === data.id?data:e).sort((a, b) => a.order - b.order)
		);
		setOpenEditForm(false);
	}

	const handleCloseEditForm = () => {
		setOpenEditForm(false);
	};

	return (
		<Dialog open={openEditForm} onClose={handleCloseEditForm}>
			<form onSubmit={handleAddMember}>
				<DialogTitle>Sửa trang bị</DialogTitle>
				<DialogContent>
					<Stack spacing={3} minWidth={500}>
						<TextField
							autoFocus
							id="name"
							label="Tên trang bị"
							fullWidth
							variant="standard"
							required
							defaultValue={oldEquipmentData?.name}
						/>
						<TextField
							id="order"
							label="Thứ tự hiển thị"
							type="number"
							fullWidth
							variant="standard"
							required
							defaultValue={oldEquipmentData?.order}
						/>
						<TextField
							id="unit"
							label="Đơn vị tính"
							fullWidth
							variant="standard"
							required
							defaultValue={oldEquipmentData?.unit}
						/>
						<TextField
							id="quantity"
							label="Số lượng"
							fullWidth
							variant="standard"
							type="number"
							required
							defaultValue={oldEquipmentData?.quantity}
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
