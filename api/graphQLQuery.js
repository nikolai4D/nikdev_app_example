async function graphQLQuery (query) {
    let response
    try {
        response = await fetch(process.env.COS_API_URL + `/graphql`, {
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

module.exports = graphQLQuery