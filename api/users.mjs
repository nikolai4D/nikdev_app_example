export function getAllUsers() {
    const query = JSON.stringify({
        query: `query {
  nodes {
    id
    title
    updated
    created
  }
  variables: {
    parentId: ""
  }
}`
    })
    return graphQLQuery(query)
}

export function getChecklistRelatedToUser(username){
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