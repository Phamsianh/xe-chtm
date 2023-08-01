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
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { getVideos } from '../../api/uploadfile';
import { deleteContent, getContents, postContent, putContent } from '../../api/contents';

export default function NoiDungBaiTapAdmin() {
	const columns = [
		{ field: 'order', headerName: 'Thứ tự hiển thị', flex: 0.5 },
		{ field: 'step', headerName: 'Tên bài', flex: 1 },
		{ field: 'id_type', headerName: 'Loại huấn luyện (Ban ngày: 1, Ban đêm: 2)', flex: 1 },
		{
			field: 'video_url',
			headerName: 'Video bài giảng',
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
	const [oldContentData, setOldContentData] = React.useState({});

	React.useEffect(() => {
		getContents().then((data) =>
			setRows(data.sort((a, b) => a.order - b.order))
		);
	}, []);
	const handleEditClick = (row) => {
		setOldContentData(row);
		setOpenEditForm(true);
	};

	async function handleDeleteClick(row) {
		const data = await deleteContent(row.id);
		if (data !== null) {
			alert('Cơ sở dữ liệu cập nhật không thành công');
			return;
		}
		setRows(rows.filter((r) => r.id !== row.id));
	}

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
								Thêm bài
							</Button>
						</GridToolbarContainer>
					),
				}}
			/>
			<AddContentForm
				openAddForm={openAddForm}
				setOpenAddForm={setOpenAddForm}
				contentsData={rows}
				setContentsData={setRows}
			/>
			<EditContentForm
				openEditForm={openEditForm}
				setOpenEditForm={setOpenEditForm}
				contentsData={rows}
				setContentsData={setRows}
				oldContentData={oldContentData}
			/>
		</Paper>
	);
}

function AddContentForm({
	openAddForm,
	setOpenAddForm,
	contentsData,
	setContentsData,
}) {
	const [videos, setVideos] = React.useState([]);
	const [videoURL, setVideoURL] = React.useState('');
	const [contentType, setContentType] = React.useState('');

	React.useEffect(() => {
		getVideos().then((data) => {
			setVideos(data);
		});
	}, []);
	async function handleAddContent(e) {
		e.preventDefault();
		const req_bod = {
			step: e.target.step.value,
			order: e.target.order.value,
			video_url: videoURL,
			id_type: contentType,
		};
		const data = await postContent(req_bod);
		setContentsData(
			[...contentsData, data].sort((a, b) => a.order - b.order)
		);
		setOpenAddForm(false);
	}

	const handleCloseAddForm = () => {
		setOpenAddForm(false);
	};

	return (
		<Dialog open={openAddForm} onClose={handleCloseAddForm}>
			<form onSubmit={handleAddContent}>
				<DialogTitle>Thêm bài giảng</DialogTitle>
				<DialogContent>
					<Stack spacing={3} minWidth={500}>
						<TextField
							autoFocus
							id="step"
							label="Tên bài giảng"
							fullWidth
							variant="standard"
							required
							defaultValue={`Bài số ${contentsData.length + 1}`}
						/>
						<TextField
							id="order"
							label="Thứ tự hiển thị"
							type="number"
							fullWidth
							variant="standard"
							required
							defaultValue={contentsData.length + 1}
						/>
						<FormControl variant="standard" required>
							<InputLabel id="video">Video bài giảng</InputLabel>
							<Select
								label="Chọn ảnh mang đeo trang bị phía trước"
								labelId="video"
								id="videoURL"
								value={videoURL}
								sx={{
									width: '100%',
								}}
								onChange={(e) => setVideoURL(e.target.value)}
							>
								{videos &&
									videos.map((video, index) => {
										return (
											<MenuItem key={index} value={video}>
												{video}
											</MenuItem>
										);
									})}
							</Select>
						</FormControl>
						<FormControl variant="standard" required>
							<InputLabel id="type">Loại huấn luyện</InputLabel>
							<Select
								label="Chọn ảnh mang đeo trang bị phía trước"
								labelId="type"
								id="contentType"
								value={contentType}
								sx={{
									width: '100%',
								}}
								onChange={(e) => setContentType(e.target.value)}
							>
								<MenuItem value={1}>
									Huấn luyện ban ngày
								</MenuItem>
								<MenuItem value={2}>
									Huấn luyện ban đêm
								</MenuItem>
							</Select>
						</FormControl>
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

function EditContentForm({
	openEditForm,
	setOpenEditForm,
	contentsData,
	setContentsData,
	oldContentData,
}) {

	const [videos, setVideos] = React.useState([]);
	const [videoURL, setVideoURL] = React.useState(oldContentData?.video_url);
	const [contentType, setContentType] = React.useState(1);

	React.useEffect(() => {
		getVideos().then((data) => {
			setVideos(data);
		});
	}, []);
	async function handleAddContent(e) {
		e.preventDefault();
		const req_bod = {
			step: e.target.step.value,
			order: e.target.order.value,
			video_url: videoURL,
			id_type: contentType,
		};
		const data = await putContent(oldContentData.id, req_bod);
		setContentsData(
			contentsData.map(c => c.id === data.id?data:c).sort((a, b) => a.order - b.order)
		);
		setOpenEditForm(false);
	}

	const handleCloseAddForm = () => {
		setOpenEditForm(false);
	};

	return (
		<Dialog open={openEditForm} onClose={handleCloseAddForm}>
			<form onSubmit={handleAddContent}>
				<DialogTitle>Thêm bài giảng</DialogTitle>
				<DialogContent>
					<Stack spacing={3} minWidth={500}>
						<TextField
							autoFocus
							id="step"
							label="Tên bài giảng"
							fullWidth
							variant="standard"
							required
							defaultValue={oldContentData?.step}
						/>
						<TextField
							id="order"
							label="Thứ tự hiển thị"
							type="number"
							fullWidth
							variant="standard"
							required
							defaultValue={oldContentData?.order}
						/>
						<FormControl variant="standard">
							<InputLabel id="video">Video bài giảng</InputLabel>
							<Select
								label="Video bài giảng"
								labelId="video"
								id="videoURL"
								value={videoURL}
								sx={{
									width: '100%',
								}}
								onChange={(e) => setVideoURL(e.target.value)}
							>
								{videos &&
									videos.map((video, index) => {
										return (
											<MenuItem key={index} value={video}>
												{video}
											</MenuItem>
										);
									})}
							</Select>
						</FormControl>
						<FormControl variant="standard" required>
							<InputLabel id="type">Loại huấn luyện</InputLabel>
							<Select
								label="Loại huấn luyện"
								labelId="type"
								id="contentType"
								value={contentType}
								sx={{
									width: '100%',
								}}
								onChange={(e) => setContentType(e.target.value)}
							>
								<MenuItem value={1}>
									Huấn luyện ban ngày
								</MenuItem>
								<MenuItem value={2}>
									Huấn luyện ban đêm
								</MenuItem>
							</Select>
						</FormControl>
					</Stack>
				</DialogContent>
				<DialogActions>
					<Button type="submit">Lưu</Button>
					<Button onClick={handleCloseAddForm}>Hủy</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}
