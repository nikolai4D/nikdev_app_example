import fetchUsers from "../actions/fetchUsers.mjs";
import {extractUserData} from "../ETL/extractUserData.mjs";
import {getCellCoords} from "nd_frontend/generics/helpers.mjs";

export default async function usersTable(table) {

    const users = (await fetchUsers()).data.nodes // Action that fetches the users from the API

    for (let user of users) {
        const userData = extractUserData(user) // Extract the data from the user object
        console.log("userData: " + JSON.stringify(userData, null, 2))
    }

    table.headers = ["name", "age", "country", "checklists"]
    table.rows = setRows(users, table)

    table.clickHandler = userTableClickHandler
    table.data = users
    table.sortPerHeader = sortPerHeader

    return table
}

async function userTableClickHandler(event) {

    const coords = getCellCoords(event)
    console.log(coords)
    if (coords[1] === 0) {
        this.sortPerHeader(coords[0])
    }

    this.rows = setRows(this.data, this)

    const oldTable = this.element
    this.element = null
    oldTable.replaceWith(this.getElement())
}

function sortPerHeader(x){
    const clickedHeader = this.headers.splice(x,1)
    this.headers.push(clickedHeader)
}

function setRows(data, table){

    return data.map(user => {
        const userData = extractUserData(user)
        const row = []

        for (let i of table.headers){
            if(typeof i === "Array") userData[i].join(",<br>")
            else row.push(userData[i])
        }

        return row
    })
}