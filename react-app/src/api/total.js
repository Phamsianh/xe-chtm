import { domain } from "../config"

export async function getTotal() {
    const token = localStorage.getItem('access_token')
    if (!token) {
        window.location.href = '/';
    }
    const url = domain + 'total';
    const resp = await fetch(url, {
        method: 'GET',
        mode: "cors",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).catch((e) => console.error('GET FETCH ERROR', e))
    console.log(resp);
    // handle the response status
    if (resp.status !== 200) {
        let error_detail = await resp.json();
        // throw new Error(JSON.stringify(error_detail));
        throw error_detail;
    } else return resp.json();
}