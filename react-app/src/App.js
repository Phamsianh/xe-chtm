import { useEffect, useState } from 'react';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import SignIn from './components/sign-in/SignIn';
import { Routes, Route } from 'react-router-dom';

function App() {
	// const [token, setToken] = useState();
	// useEffect(() => {
	// 	setToken(localStorage.getItem('access_token'));
	// }, []);
	return (
		<div className="App">
			<Routes>
				<Route path="/*" element={<Dashboard />} />
				{/* <Route path="/signin" element={<SignIn />} /> */}
			</Routes>

			{/* {token ? <Dashboard /> : } */}
		</div>
	);
}

export default App;