export default async function () {
    const resp = await fetch("/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
}