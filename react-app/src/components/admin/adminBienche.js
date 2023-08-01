import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { GridActionsCellItem, GridToolbarContainer } from '@mui/x-data-grid';
import {
	Paper,
	Button,
	Select,
	MenuItem,
	InputLabel,
	Stack,
	FormControl,
} from '@mui/material';
import { deleteMember, getMember, postMember, putMember } from '../../api/members';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { getImages } from '../../api/uploadfile';

export default function BienCheAdmin() {
	const columns = [
		{ field: 'order', headerName: 'Thứ tự hiển thị', flex: 1},
		{ field: 'name', headerName: 'Biên chế', flex: 1 },
		{
			field: 'img_url_1',
			headerName: 'Ảnh biên chế trang bị phía trước',
			flex: 1,
		},
		{
			field: 'img_url_2',
			headerName: 'Ảnh biên chế trang bị phía sau',
			flex: 1,
		},
		{ field: 'note', headerName: 'Ghi chú', flex: 1 },
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
						sx={{
							color: 'primary.main',
						}}
						onClick={() => handleEditClick(row)}
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
	const [rows, setRows] = React.useState([]);
	const [openAddForm, setOpenAddForm] = React.useState(false);
	const [openEditForm, setOpenEditForm] = React.useState(false);
	const [oldMemeberData, setOldMemeberData] = React.useState({});

	React.useEffect(() => {
		getMember().then((data) =>
			setRows(data.sort((a, b) => a.order - b.order))
		);
	}, []);
	const handleEditClick = (row) => {
		setOldMemeberData(row)
		setOpenEditForm(true);
	};

	async function handleDeleteClick(row) {
		const data = await deleteMember(row.id);
		if(data !== null){
			alert('Cơ sở dữ liệu cập nhật không thành công')
			return;
		}
		setRows(rows.filter( r => r.id !== row.id));
	};
	
	const handleAddClick = () => {
		setOpenAddForm(true);
	};

	return (
		<Paper sx={{m: 3}}>
			<DataGrid
				rows={rows}
				columns={columns}
				slots={{
					toolbar: () => (
						<GridToolbarContainer>
							<Button
								color="primary"
								startIcon={<AddIcon />}
								onClick={handleAddClick}
							>
								Thêm biên chế
							</Button>
						</GridToolbarContainer>
					),
				}}
			/>
			<AddMemberForm
				openAddForm={openAddForm}
				setOpenAddForm={setOpenAddForm}
				membersData={rows}
				setMembersData={setRows}
			/>
			<EditMemberForm
				openEditForm={openEditForm}
				setOpenEditForm={setOpenEditForm}
				membersData={rows}
				setMembersData={setRows}
				oldMemeberData={oldMemeberData}
			/>
		</Paper>
	);
}

function AddMemberForm({
	openAddForm,
	setOpenAddForm,
	membersData,
	setMembersData,
}) {
	const [images, setImages] = React.useState([]);
	const [frontImageURL, setFrontImageURL] = React.useState('');
	const [backImageURL, setBackImageURL] = React.useState('');

	React.useEffect(() => {
		getImages().then((data) => {
			setImages(data);
		});
	}, []);

	async function handleAddMember(e) {
		e.preventDefault();
		const req_bod = {
			name: e.target.name.value,
			order: e.target.order.value,
			img_url_1: frontImageURL,
			img_url_2: backImageURL,
			note: e.target.note.value,
		};
		const data = await postMember(req_bod);
		setMembersData(
			[...membersData, data].sort((a, b) => a.order - b.order)
		);
		setOpenAddForm(false);
	}

	const handleCloseAddForm = () => {
		setOpenAddForm(false);
	};

	return (
		<Dialog open={openAddForm} onClose={handleCloseAddForm}>
			<form onSubmit={handleAddMember}>
				<DialogTitle>Thay đổi biên chế mới</DialogTitle>
				<DialogContent>
					<Stack spacing={3} minWidth={500}>
						<TextField
							autoFocus
							id="name"
							label="Tên biên chế"
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
						/>
						<FormControl variant="standard" id="frontImage">
							<InputLabel id="frontImage">
								Ảnh mang đeo trang bị phía trước
							</InputLabel>
							<Select
								label="Chọn ảnh mang đeo trang bị phía trước"
								labelId="frontImage"
								id="frontImageURL"
								value={frontImageURL}
								sx={{
									width: '100%',
								}}
								onChange={(e) =>
									setFrontImageURL(e.target.value)
								}
							>
								{images &&
									images.map((image, index) => {
										return (
											<MenuItem key={index} value={image}>
												{image}
											</MenuItem>
										);
									})}
							</Select>
						</FormControl>
						<FormControl variant="standard">
							<InputLabel id="backImage">
								Ảnh mang đeo trang bị phía sau
							</InputLabel>
							<Select
								label="Chọn ảnh mang đeo trang bị phía sau"
								labelId="backImage"
								id="backImageURL"
								value={backImageURL}
								sx={{
									width: '100%',
								}}
								onChange={(e) =>
									setBackImageURL(e.target.value)
								}
							>
								{images &&
									images.map((image, index) => {
										return (
											<MenuItem key={index} value={image}>
												{image}
											</MenuItem>
										);
									})}
							</Select>
						</FormControl>
						<TextField
							id="note"
							label="Mô tả ảnh"
							fullWidth
							variant="standard"
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

function EditMemberForm({
	openEditForm,
	setOpenEditForm,
	membersData,
	setMembersData,
	oldMemeberData,
}) {
	const [images, setImages] = React.useState([]);
	const [frontImageURL, setFrontImageURL] = React.useState(
		oldMemeberData?.img_url_1
	);
	const [backImageURL, setBackImageURL] = React.useState(
		oldMemeberData?.img_url_1
	);

	React.useEffect(() => {
		getImages().then((data) => {
			setImages(data);
		});
	}, []);

	async function handleEditMember(e) {
		e.preventDefault();
		const req_bod = {
			name: e.target.name.value,
			order: e.target.order.value,
			img_url_1: frontImageURL,
			img_url_2: backImageURL,
			note: e.target.note.value,
		};
		const data = await putMember(oldMemeberData.id, req_bod);
		setMembersData(
			membersData
				.map((md) => (md.id === data.id ? data : md))
				.sort((a, b) => a.order - b.order)
		);
		setOpenEditForm(false);
	}

	const handleCloseAddForm = () => {
		setOpenEditForm(false);
	};

	return (
		<Dialog open={openEditForm} onClose={handleCloseAddForm}>
			<form onSubmit={handleEditMember}>
				<DialogTitle>Thay đổi biên chế</DialogTitle>
				<DialogContent>
					<Stack spacing={3} minWidth={500}>
						<TextField
							autoFocus
							id="name"
							label="Tên biên chế"
							fullWidth
							variant="standard"
							required
							defaultValue={oldMemeberData?.name}
						/>
						<TextField
							id="order"
							label="Thứ tự hiển thị"
							type="number"
							fullWidth
							variant="standard"
							required
							defaultValue={oldMemeberData?.order}
						/>
						<FormControl variant="standard" id="frontImage">
							<InputLabel id="frontImage">
								Ảnh mang đeo trang bị phía trước
							</InputLabel>
							<Select
								label="Chọn ảnh mang đeo trang bị phía trước"
								labelId="frontImage"
								id="frontImageURL"
								value={frontImageURL}
								sx={{
									width: '100%',
								}}
								onChange={(e) =>
									setFrontImageURL(e.target.value)
								}
							>
								{images &&
									images.map((image, index) => {
										return (
											<MenuItem key={index} value={image}>
												{image}
											</MenuItem>
										);
									})}
							</Select>
						</FormControl>
						<FormControl variant="standard">
							<InputLabel id="backImage">
								Ảnh mang đeo trang bị phía sau
							</InputLabel>
							<Select
								label="Chọn ảnh mang đeo trang bị phía sau"
								labelId="backImage"
								id="backImageURL"
								value={backImageURL}
								sx={{
									width: '100%',
								}}
								onChange={(e) =>
									setBackImageURL(e.target.value)
								}
							>
								{images &&
									images.map((image, index) => {
										return (
											<MenuItem key={index} value={image}>
												{image}
											</MenuItem>
										);
									})}
							</Select>
						</FormControl>
						<TextField
							id="note"
							label="Mô tả ảnh"
							fullWidth
							variant="standard"
							defaultValue={oldMemeberData?.note}
						/>
					</Stack>
				</DialogContent>
				<DialogActions>
					<Button type="submit">Update</Button>
					<Button onClick={handleCloseAddForm}>Close</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}
