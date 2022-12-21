export async function getAllVehicles() {
    const resp = await fetch("api/vehicles", {
        method: "GET"
    })

    return await resp.json()
}