import { domain } from '../config';

export async function getToken(loginData) {
	const url = domain + 'token';
	const resp = await fetch(url, {
		method: 'POST',
		mode: 'cors',
        'content-type': 'application/x-www-form-urlencoded',
		body: loginData,
	}).catch((e) => console.error('GET FETCH ERROR', e));
	
	// handle the response status
	if (resp.status !== 200) {
		let error_detail = await resp.json();
		// throw new Error(JSON.stringify(error_detail));
		throw error_detail;
	} else return resp.json();
}
