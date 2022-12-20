import fetchUsers from "../actions/fetchUsers.mjs";
import {Table} from "nd_frontend/framework/generics/frontend/organisms/Table.mjs";

export default async function userTable() {
    // const table = new Table()

    const users = (await fetchUsers()).data.nodes

    console.log("users: ", JSON.stringify(users, null, 2))
    table.headers = ["name", "email", "color", "year"]
    table.rows = users.map(user => {
        const row = []
        row.push(user.title)
        for (let rel of user.relationships) {
            row.push(rel.sourceNode.title)
        }

        console.log("row: ", row)
        return row
    })

    return table
}