import {state} from "../store/state.js";

export async function login(username, password) {
    const resp = await fetch("/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    })

    const respBody = await resp.json()
    if(respBody.message === "success") {
        state.credentials = respBody.user
    }
    else console.warn("Wrong credentials")

    return respBody
}

export async function getAllUsers() {
    const resp = await fetch("/api/users/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })

    return await resp.json()
}

