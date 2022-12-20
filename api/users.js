const {apiCallPost} = require('./helpers')
const axios = require("axios");

async function getAllUsers() {
    const query = {
        query: `query RooterQueryType($input:QueryInput){
            nodes(itemInput:$input){
                id
                title
                updated
                created
                relationships {
                    id
                    sourceId
                    sourceNode {
                        parentId
                        title
                    }
                 }
            }
        }`,
        variables: {
            input: {
                parentId: "co_19c2f22d-a0c3-472d-84ef-f84ecb631d6c"
            }
        }
    }

    let response


    response = await apiCallPost(query, "/api/graphql")
    return response.data

}


module.exports = { getAllUsers }