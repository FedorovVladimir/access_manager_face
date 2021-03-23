import App from './App.svelte';

const app = new App({
    target: document.body
});

export default app;

let baseUrl = "http://localhost:8080"

export async function getFetch(url) {
    let response = await fetch(baseUrl + url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + btoa("admin:admin")
        }
    });
    return await response.json();
}

export async function postFetch(url, data) {
    let response = await fetch(baseUrl + url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + btoa("admin:admin")
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

export async function deleteFetch(url) {
    let response = await fetch(baseUrl + url, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + btoa("admin:admin")
        },
    });
    return response.json();
}
