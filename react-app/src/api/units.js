import { domain } from "../config"

export async function getUnits() {
    const token = localStorage.getItem('access_token')
    if (!token) {
        window.location.href = '/';
    }
    const url = domain + 'units';
    const resp = await fetch(url, {
        method: 'GET',
        mode: "cors",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }).catch((e) => console.error('GET FETCH ERROR', e))
    console.log(resp);
    // handle the response status
    if (resp.status !== 200) {
        let error_detail = await resp.json();
        throw error_detail;
    } else return resp.json();
}

export async function getUnitsByLevel(unitLevel) {
    const token = localStorage.getItem('access_token')
    if (!token) {
        window.location.href = '/';
    }
    const url = domain + 'units/level/unit' + unitLevel;
    const resp = await fetch(url, {
        method: 'GET',
        mode: "cors",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }).catch((e) => console.error('GET FETCH ERROR', e))
    console.log(resp);
    // handle the response status
    if (resp.status !== 200) {
        let error_detail = await resp.json();
        throw error_detail;
    } else return resp.json();
}

export async function getChildUnits(parentUnitLevel, paretUnitId) {
    const token = localStorage.getItem('access_token')
    if (!token) {
        window.location.href = '/';
    }
    const url = `${domain}units/level/unit${parentUnitLevel}/${paretUnitId}/childs`;
    const resp = await fetch(url, {
        method: 'GET',
        mode: "cors",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }).catch((e) => console.error('GET FETCH ERROR', e))
    console.log(resp);
    // handle the response status
    if (resp.status !== 200) {
        let error_detail = await resp.json();
        throw error_detail;
    } else return resp.json();
}

export async function getUnitsTable() {
    const token = localStorage.getItem('access_token')
    if (!token) {
        window.location.href = '/';
    }
    const url = domain + 'units/table';
    const resp = await fetch(url, {
        method: 'GET',
        mode: "cors",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }).catch((e) => console.error('GET FETCH ERROR', e))
    console.log(resp);
    // handle the response status
    if (resp.status !== 200) {
        let error_detail = await resp.json();
        throw error_detail;
    } else return resp.json();
}

export async function postUnit(req_body, unit_level) {
    const token = localStorage.getItem('access_token')
    if (!token) {
        window.location.href = '/';
    }
    const url = domain + 'units/unit' + unit_level;
    const resp = await fetch(url, {
        method: 'POST',
        mode: "cors",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req_body)
    }).catch((e) => console.error(e))
    console.log(resp);
    // handle the response status
    if (resp.status !== 201) {
        let error_detail = await resp.json();
        throw error_detail;
    } else return resp.json();
}

export async function putUnit(unit_id, req_body) {
    const token = localStorage.getItem('access_token')
    if (!token) {
        window.location.href = '/';
    }
    const url = domain + 'units/' + unit_id;
    const resp = await fetch(url, {
        method: 'PUT',
        mode: "cors",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req_body)
    }).catch((e) => console.error(e))
    console.log(resp);
    // handle the response status
    if (resp.status !== 200) {
        let error_detail = await resp.json();
        throw error_detail;
    } else return resp.json();
}

export async function deleteUnit(unit_id) {
    const token = localStorage.getItem('access_token')
    if (!token) {
        window.location.href = '/';
    }
    const url = domain + 'units/' + unit_id;
    const resp = await fetch(url, {
        method: 'DELETE',
        mode: "cors",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).catch((e) => console.error(e))
    console.log(resp);
    // handle the response status
    if (resp.status != 401) {
        let error_detail = await resp.json();
        throw error_detail;
    } else return resp.json();
}