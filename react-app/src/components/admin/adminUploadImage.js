import {
	TextField,
	Button,
	ImageList,
	ImageListItem,
	ImageListItemBar,
	IconButton,
	Snackbar,
	Alert,
	Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
	deleteImage,
	getImages,
	uploadImage,
} from '../../api/uploadfile';
import React from 'react';
import { domain } from '../../config';

export default function UploadImage() {
	const [imagesList, setImagesList] = React.useState(null);
	const [alert, setAlert] = React.useState({ open: false });

	const handleSubmit = (e) => {
		e.preventDefault();
        if(imagesList.indexOf(e.target.image.files[0].filename) >= 0) {
            setAlert({
                open: true,
                severity: 'error',
                message: 'Tên file ảnh đã tồn tại',
            });
            return
        }
		const file_upload = new FormData();
		file_upload.append('file', e.target.image.files[0]);
		uploadImage(file_upload).then((filename) => {
			const newImagesList = [filename.filename, ...imagesList];
			console.log(newImagesList);
			setAlert({
				open: true,
				severity: 'success',
				message: 'Cập nhật cơ sở dữ liệu thành công',
			});
			setImagesList(newImagesList);
		});
	};
	React.useEffect(() => {
		getImages().then((data) => {
			console.log(data);
			setImagesList(data);
		});
	}, []);

	const handleDelete = (filename) => {
		deleteImage(filename).then((data) => {
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
			getImages().then((data) => {
				console.log(data);
				setImagesList(data);
			});
		});
	};
	const handleCloseSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setAlert({ open: false });
	};

	return (
		<Paper sx={{m: 3}}>
			<form onSubmit={handleSubmit}>
				<TextField
					id="image"
					name="image"
					label="Upload ảnh"
					type="file"
					fullWidth
					variant="standard"
					required
				/>
				<Button type="submit">Upload</Button>
			</form>
			<ImageList cols={3}>
				{imagesList &&
					imagesList.map((item, index) => (
						<ImageListItem key={index}>
							<img
								id={'images-' + index}
								src={`${domain}images/${item}?w=164&h=164&fit=crop&auto=format`}
								srcSet={`${domain}images/${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
								alt={item}
								loading="lazy"
							/>
							<ImageListItemBar
								sx={{
									background:
										'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
										'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
								}}
								title={item}
								position="top"
								actionIcon={
									<IconButton
										sx={{ color: 'white' }}
										aria-label={item}
										onClick={() => handleDelete(item)}
									>
										<DeleteIcon />
									</IconButton>
								}
							/>
						</ImageListItem>
					))}
			</ImageList>
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
