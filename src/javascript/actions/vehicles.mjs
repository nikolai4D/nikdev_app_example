export async function getAllVehicles() {
    const resp = await fetch("vehicles", {
        method: "GET"
    })

    return await resp.json()
}