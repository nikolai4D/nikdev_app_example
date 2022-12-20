export function extractUserData(user){
    const   name = user.title,
            age = user.relationships.find(rel => rel.sourceNode.parentId === "co_c4e24d3c-42b1-49d9-b086-d816473c17a7").sourceNode.title,
            country = user.relationships.find(rel => rel.sourceNode.parentId === "co_dea5c3ee-8a56-4e62-b391-a97844ec9b27").sourceNode.title,
            checklists = user.relationships.filter(rel => rel.sourceNode.parentId === "co_cb04ef5f-27ae-43c7-a6de-29c5f8ee98e5").map(rel => rel.sourceNode.title)

    return {name, age, country, checklists}
}