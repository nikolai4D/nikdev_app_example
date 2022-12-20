import fetchUsers from "../actions/fetchUsers.mjs";
import {extractUserData} from "../ETL/extractUserData.mjs";

export default async function usersTable(table) {

    const users = (await fetchUsers()).data.nodes // Action that fetches the users from the API

    for (let user of users) {
        const userData = extractUserData(user) // Extract the data from the user object
        console.log("userData: " + JSON.stringify(userData, null, 2))
    }

    table.headers = ["name", "age", "country", "checklists"]
    table.rows = users.map(user => {
        const userData = extractUserData(user)
        const row = []
        row.push(userData.name, userData.age, userData.country, userData.checklists)
        return row
    })

    return table
}