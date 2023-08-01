import { useEffect, useState } from 'react';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import SignIn from './components/sign-in/SignIn';
import { Routes, Route } from 'react-router-dom';
import DashboardAdmin from './components/admin/adminDashboard';
import ResetDB from './components/reset-db/resetDb';

function App() {
	const [token, setToken] = useState();
	useEffect(() => {
		setToken(localStorage.getItem('access_token'));
	}, []);
	return (
		<div className="App">
			<Routes>
				<Route path="/login" element={<SignIn/>} />
				<Route path="/reset_db" element={<ResetDB/>} />
				<Route path="/*" element={token ? <DashboardAdmin /> : <Dashboard />} />
			</Routes>
			
		</div>
	);
}

export default App;