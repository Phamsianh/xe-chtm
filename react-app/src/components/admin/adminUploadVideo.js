import {
	TextField,
	Button,
	Snackbar,
	Alert,
	Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import { deleteVideo, getVideos, uploadVideo } from '../../api/uploadfile';
import React from 'react';
import { domain } from '../../config';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

export default function UploadVideo() {
	const [videosList, setVideosList] = React.useState([]);
	const [alert, setAlert] = React.useState({ open: false });

	const handleSubmit = (e) => {
		e.preventDefault();
		if(videosList.indexOf(e.target.video.files[0].name) >= 0) {
            setAlert({
                open: true,
                severity: 'error',
                message: 'Tên file ảnh đã tồn tại',
            });
            return
        }
		const file_upload = new FormData();
		file_upload.append('file', e.target.video.files[0]);
		if (videosList.indexOf(e.target.video.files[0].filename) >= 0) {
			setAlert({
				open: true,
				severity: 'error',
				message: 'Tên file đã tồn tại',
			});
			return;
		}
		uploadVideo(file_upload).then((filename) => {
			const newImagesList = [filename.filename, ...videosList];
			console.log(newImagesList);
			setAlert({
				open: true,
				severity: 'success',
				message: 'Cập nhật cơ sở dữ liệu thành công',
			});
			setVideosList(newImagesList);
		});
	};
	React.useEffect(() => {
		getVideos().then((data) => {
			console.log(data);
			setVideosList(data);
		});
	}, []);

	const handleDelete = (filename) => {
		deleteVideo(filename).then((data) => {
			if (data !== null) {
				setAlert({
					open: true,
					severity: 'error',
					message: 'Cập nhật cơ sở dữ liệu không thành công',
				});
				return;
			}
			setAlert({
				open: true,
				severity: 'success',
				message: 'Cập nhật cơ sở dữ liệu thành công',
			});
			getVideos().then((data) => {
				console.log(data);
				setVideosList(data);
			});
		});
	};
	const handleCloseSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setAlert({ open: false });
	};

	const handleOpenVideo = (filename) => {
		window.open(domain + 'videos/' + filename);
	}

	const cols = [
		{ field: 'id', headerName: 'ID', flex: 1 },
		{
			field: 'filename',
			headerName: 'Tên file',
			flex: 1,
		},
		{
			field: 'Action',
			type: 'actions',
			headerName: 'Xem, Xóa',
			width: 90,
			getActions: ({ row }) => {
				return [
					<GridActionsCellItem
						icon={<OpenInBrowserIcon />}
						label="Open"
						onClick={() => handleOpenVideo(row.filename)}
						sx={{
							color: 'primary.main',
						}}
					/>,
					<GridActionsCellItem
						icon={<DeleteIcon />}
						label="Delete"
						onClick={() => handleDelete(row.filename)}
						sx={{
							color: 'error.main',
						}}
					/>,
				];
			},
		},
	];

	return (
		<Paper sx={{m: 3}}>
			<form onSubmit={handleSubmit}>
				<TextField
					id="video"
					name="video"
					label="Upload video"
					type="file"
					fullWidth
					variant="standard"
					required
				/>
				<Button type="submit">Upload</Button>
			</form>
			<DataGrid
				rows={videosList.map((item, index) => {
					return {
						id: index + 1,
						filename: item,
					};
				})}
				columns={cols}
			/>
			<Snackbar
				open={alert.open}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity={alert?.severity}
					sx={{ width: '100%' }}
				>
					{alert?.message}
				</Alert>
			</Snackbar>
		</Paper>
	);
}

