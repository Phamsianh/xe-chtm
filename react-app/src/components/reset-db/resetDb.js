import {
	Stack,
	TextField,
	Typography,
	Button,
	Container,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { domain } from '../../config';

export default function ResetDB() {
	const [disable, setDisable] = useState(true);
	const [value, setValue] = useState('');
	const [status, setStatus] = useState('');

	useEffect(() => {
		if (value === 'yes') {
			setDisable(false);
		} else setDisable(true);
	}, [value]);
	async function handleSubmit(e) {
		e.preventDefault();
		const data = await resetDb();
		if (data === null) {
			setStatus(
				'Khởi tạo cơ sở dữ liệu thành công. Quay trở lại trang chủ trong giây lát...'
			);
			localStorage.removeItem('access_token');
			localStorage.removeItem('token_type');
			window.location.href = '/';
			setTimeout(() => {
				window.location.href = '/';
			}, 5000);
			return;
		}
		setStatus('Khởi tạo cơ sở dữ liệu thất bại.');
		return;
	}

	return (
		<Container
			component="main"
			maxWidth="xs"
			sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}
		>
			<Stack direction={'column'} spacing={3}>
				<Typography variant="h4" sx={{color: 'success.main'}}>{status}</Typography>
				<Typography variant="h4">
					Đồng chí chắc chắn muốn khởi tạo lại cơ sở dữ liệu?
				</Typography>
				<Typography variant="body">
					Tất cả các dữ liệu hiện tại sẽ bị xóa.
					<br />
					<em>
						(Nếu đây là lần truy cập đầu tiên hay khởi tạo cơ sở dữ
						liệu để tạo cơ sở dữ liệu mới)
					</em>
				</Typography>
				<Typography variant="body" sx={{ color: 'warning.main' }}>
					Nhập <strong>"yes"</strong> để dồng ý.
				</Typography>

				<form onSubmit={handleSubmit}>
					<Stack direction={'column'} spacing={3}>
						<TextField
							variant="standard"
							value={value}
							onChange={(e) => setValue(e.target.value)}
						/>
						<Button
							type="submit"
							variant="contained"
							disabled={disable}
						>
							Khởi tạo
						</Button>
						<Button
							variant="outlined"
							onClick={() => (window.location.href = '/')}
						>
							Quay lại trang chủ
						</Button>
					</Stack>
				</form>
			</Stack>
		</Container>
	);
}

async function resetDb() {
	const url = domain + 'reset_db';
	const resp = await fetch(url, {
		method: 'GET',
	}).catch((e) => console.error('GET FETCH ERROR', e));
	
	// handle the response status
	if (resp.status !== 200) {
		let error_detail = await resp.json();
		throw error_detail;
	} else return resp.json();
}
