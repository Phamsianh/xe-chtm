import {
	Box,
	Card,
	Grid,
	Paper,
	Typography,
	Stack,
	TextField,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { getCurrentCadres } from '../../api/cadres';
import { getCurrentAccount } from '../../api/account';

export default function Profile() {
	const [currentCadres, setCurrentCadres] = useState();
	const [currentAccount, setCurrentAccount] = useState();
	const [anchorEl, setAnchorEl] = useState(null);
	useEffect(() => {
		getCurrentCadres('me').then((data) => {
			console.log(data);
			setCurrentCadres(data);
		});
		getCurrentAccount('me').then((data) => {
			console.log(data);
			setCurrentAccount(data);
		});
	}, []);
	return (
		<Grid container spacing={2} sx={{ mt: 2, mb: 2, pl: 2, pr: 2 }}>
			{currentCadres && (
				<Grid item xs={12} sm={12} md={6}>
					<Card>
						<Stack>
							<Typography variant="h5">
								Thông tin cán bộ
							</Typography>
							<Grid container>
								<Grid item xs={12} sm={6}>
									<Paper
										elevation={5}
										sx={{
											height: 300,
											minWidth: 300,
											m: 1,
										}}
									>
										Hình ảnh
									</Paper>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										id="Hoten"
										label="Họ tên cán bộ"
										variant="standard"
										value={currentCadres.Hoten}
										InputProps={{
											readOnly: true,
										}}
										sx={{ mb: 1 }}
									/>
									<TextField
										id="MaCB"
										label="Mã cán bộ"
										variant="standard"
										value={currentCadres.MaCB}
										InputProps={{
											readOnly: true,
										}}
										sx={{ mb: 1 }}
									/>
									<TextField
										id="Units_c1"
										label="Đơn vị cấp 1"
										variant="standard"
										value={currentCadres.Units_c1}
										InputProps={{
											readOnly: true,
										}}
										sx={{ mb: 1 }}
									/>
									<TextField
										id="Units_c2"
										label="Đơn vị cấp 2"
										variant="standard"
										value={currentCadres.Units_c2}
										InputProps={{
											readOnly: true,
										}}
										sx={{ mb: 1 }}
									/>
									<TextField
										id="Units_c3"
										label="Đơn vị cấp 3"
										variant="standard"
										value={currentCadres.Units_c3}
										InputProps={{
											readOnly: true,
										}}
										sx={{ mb: 1 }}
									/>
									<TextField
										id="Units_c1"
										label="Đơn vị cấp 4"
										variant="standard"
										value={currentCadres.Units_c4}
										InputProps={{
											readOnly: true,
										}}
										sx={{ mb: 1 }}
									/>
								</Grid>
							</Grid>
							<Grid container>
								<Grid item xs={12} sm={6}>
									<TextField
										id="Computer_name"
										label="Tên máy tính"
										variant="standard"
										value={currentCadres.Computer_name}
										InputProps={{
											readOnly: true,
										}}
										sx={{ mb: 1 }}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										id="MAC"
										label="Địa chỉ MAC"
										variant="standard"
										value={currentCadres.MAC}
										InputProps={{
											readOnly: true,
										}}
										sx={{ mb: 1 }}
									/>
								</Grid>
							</Grid>

							<Grid container>
								<Grid item xs={12} sm={6}>
									<TextField
										id="Position"
										label="Chức vụ"
										variant="standard"
										value={currentCadres.Position}
										InputProps={{
											readOnly: true,
										}}
										sx={{ mb: 1 }}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										id="Auto_start"
										label="Auto "
										variant="standard"
										value={currentCadres.MAC}
										InputProps={{
											readOnly: true,
										}}
										sx={{ mb: 1 }}
									/>
								</Grid>
							</Grid>
						</Stack>
					</Card>
				</Grid>
			)}
			{currentAccount && (
				<Grid item xs={12} sm={12} md={6}>
					<Card>
						<Stack>
							<Typography variant="h5">
								Tài khoản, mật khẩu
							</Typography>
							<Grid container>
								<Grid item xs={12} sm={6}>
									<TextField
										id="username"
										label="Username"
										variant="standard"
										value={currentAccount.username}
										InputProps={{
											readOnly: true,
										}}
										sx={{ mb: 1 }}
									/>
								</Grid>
                                <Grid item xs={12} sm={6}>
									<TextField
										id="password"
										label="Password"
										variant="standard"
                                        type='password'
										value={currentAccount.password_}
										InputProps={{
											readOnly: true,
										}}
										sx={{ mb: 1 }}
									/>
								</Grid>
							</Grid>
						</Stack>
					</Card>
				</Grid>
			)}
		</Grid>
	);
}
