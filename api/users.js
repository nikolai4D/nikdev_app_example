async function getAllUsers() {
    const query = JSON.stringify({
        query: `query {
  nodes {
    id
    title
    updated
    created
  }
  variables: {
    parentId: "co_19c2f22d-a0c3-472d-84ef-f84ecb631d6c"
  }
}`
    })

    const resp = await graphQLQuery(query)
    return resp.data.nodes
}

async function getChecklistRelatedToUser(username){
    const query = JSON.stringify({
        query: `query {
  users {
    id
    email
    name
    password
    updated
    created
  }
  variables: {
    title: "${username}"
    }
}`
    })
    return graphQLQuery(query)
}

module.exports = { getAllUsers, getChecklistRelatedToUser }