export default async function (query) {

    const cosURL = process.env.COS_API_URL
    let response
    try {
        response = await fetch(`/api/graphql`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: query
        });
    } catch (err) {
        console.log(err);
    }
    return await response.json()

}