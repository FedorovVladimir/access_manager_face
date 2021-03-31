import App from './App.svelte';

const app = new App({
    target: document.body
});

export default app;

function trimPrefix(str, prefix) {
    if (str.startsWith(prefix)) {
        return str.slice(prefix.length)
    } else {
        return str
    }
}

export async function getFetch(url, login, password) {
    // let baseUrl = "http://localhost:8080/" // dev
    let baseUrl = window.location.href // prod
    let response = await fetch(baseUrl + trimPrefix(url, "/"), {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + btoa(login + ":" + password)
        }
    });
    return await response.json();
}

export async function postFetch(url, login, password, data) {
    // let baseUrl = "http://localhost:8080/" // dev
    let baseUrl = window.location.href // prod
    let b = JSON.stringify(data)
    let response = await fetch(baseUrl + trimPrefix(url, "/"), {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + btoa(login + ":" + password)
        },
        body: b
    });
    return response.json();
}

export async function deleteFetch(url, login, password) {
    // let baseUrl = "http://localhost:8080/" // dev
    let baseUrl = window.location.href // prod
    let response = await fetch(baseUrl + trimPrefix(url, "/"), {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + btoa(login + ":" + password)
        },
    });
    return response.json();
}
