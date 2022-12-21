async function graphQLQuery(query) {
    {
        let response
        try {
            response = await fetch(`api/graphql`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: sessionStorage.getItem("accessToken"),
                },
                body: query
            });
        } catch (err) {
            console.log(err);
        }
        return await response.json()
    }
}