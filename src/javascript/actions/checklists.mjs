export async function getChecklistsRelatedToUser(username) {
    const resp = await fetch("/api/checklists/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username}),
    })

    return await resp.json()
}