import { domain } from "../config"

export async function getMember() {
    const url = domain + 'members';
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

export async function postMember(req_body) {
    const token = localStorage.getItem('access_token')
    if (!token) {
        window.location.href = '/';
    }
    const url = domain + 'members';
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

export async function putMember(member_id, req_body) {
    const token = localStorage.getItem('access_token')
    if (!token) {
        window.location.href = '/';
    }
    const url = domain + 'members/' + member_id;
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

export async function deleteMember(member_id) {
    const token = localStorage.getItem('access_token')
    if (!token) {
        window.location.href = '/';
    }
    const url = domain + 'members/' + member_id;
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