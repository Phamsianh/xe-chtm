import { domain } from "../config"

export async function getContents() {
    const url = domain + 'contents';
    const resp = await fetch(url, {
        method: 'GET',
        mode: "cors",
    }).catch((e) => console.error('GET FETCH ERROR', e))
    // handle the response status
    if (resp.status !== 200) {
        let error_detail = await resp.json();
        throw error_detail;
    } else return resp.json();
}

export async function getContentByType(id_type) {
    const url = domain + 'contents/' + id_type;
    const resp = await fetch(url, {
        method: 'GET',
        mode: "cors",
    }).catch((e) => console.error('GET FETCH ERROR', e))
    // handle the response status
    if (resp.status !== 200) {
        let error_detail = await resp.json();
        throw error_detail;
    } else return resp.json();
}

export async function postContent(req_body) {
    const token = localStorage.getItem('access_token')
    if (!token) {
        window.location.href = '/';
    }
    const url = domain + 'contents';
    const resp = await fetch(url, {
        method: 'POST',
        mode: "cors",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req_body)
    }).catch((e) => console.error(e))

    // handle the response status
    if (resp.status !== 201) {
        let error_detail = await resp.json();
        throw error_detail;
    } else return resp.json();
}

export async function putContent(content_id, req_body) {
    const token = localStorage.getItem('access_token')
    if (!token) {
        window.location.href = '/';
    }
    const url = domain + 'contents/' + content_id;
    const resp = await fetch(url, {
        method: 'PUT',
        mode: "cors",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req_body)
    }).catch((e) => console.error(e))

    // handle the response status
    if (resp.status !== 200) {
        let error_detail = await resp.json();
        throw error_detail;
    } else return resp.json();
}

export async function deleteContent(content_id) {
    const token = localStorage.getItem('access_token')
    if (!token) {
        window.location.href = '/';
    }
    const url = domain + 'contents/' + content_id;
    const resp = await fetch(url, {
        method: 'DELETE',
        mode: "cors",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).catch((e) => console.error(e))

    // handle the response status
    if (resp.status !== 410) {
        let error_detail = await resp.json();
        throw error_detail;
    } else return resp.json();
}