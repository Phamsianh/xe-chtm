import { domain } from '../config';

export async function getImages() {
	const url = domain + 'images';
	const resp = await fetch(url, {
		method: 'GET',
	}).catch((e) => console.error(e));
	
	// handle the response status
	if (resp.status !== 200) {
		let error_detail = await resp.json();
		throw error_detail;
	} else return resp.json();
}

export async function getImage(file_name) {
	const url = domain + 'images/' + file_name;
	const resp = await fetch(url, {
		method: 'GET',
	}).catch((e) => console.error(e));
	
	// handle the response status
	if (resp.status !== 200) {
		let error_detail = await resp.json();
		throw error_detail;
	} else return resp.blob();
}

export async function uploadImage(file) {
	const token = localStorage.getItem('access_token');
	if (!token) {
		window.location.href = '/';
	}
	const url = domain + 'images';
	const resp = await fetch(url, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: file,
	}).catch((e) => console.error(e));
	
	// handle the response status
	if (resp.status !== 201) {
		let error_detail = await resp.json();
		throw error_detail;
	} else return resp.json();
}

export async function deleteImage(filename) {
	const token = localStorage.getItem('access_token');
	if (!token) {
		window.location.href = '/';
	}
	const url = domain + 'images/' + filename;
	const resp = await fetch(url, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}).catch((e) => console.error(e));
	
	// handle the response status
	if (resp.status !== 410) {
		let error_detail = await resp.json();
		throw error_detail;
	} else return resp.json();
}

export async function getVideos() {
	const url = domain + 'videos';
	const resp = await fetch(url, {
		method: 'GET',
	}).catch((e) => console.error(e));
	
	// handle the response status
	if (resp.status !== 200) {
		let error_detail = await resp.json();
		throw error_detail;
	} else return resp.json();
}

export async function uploadVideo(file) {
	const token = localStorage.getItem('access_token');
	if (!token) {
		window.location.href = '/';
	}
	const url = domain + 'videos';
	const resp = await fetch(url, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: file,
	}).catch((e) => console.error(e));
	
	// handle the response status
	if (resp.status !== 201) {
		let error_detail = await resp.json();
		throw error_detail;
	} else return resp.json();
}

export async function deleteVideo(filename) {
	const token = localStorage.getItem('access_token');
	if (!token) {
		window.location.href = '/';
	}
	const url = domain + 'videos/' + filename;
	const resp = await fetch(url, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}).catch((e) => console.error(e));
	
	// handle the response status
	if (resp.status !== 410) {
		let error_detail = await resp.json();
		throw error_detail;
	} else return resp.json();
}