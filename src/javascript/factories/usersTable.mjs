import {extractUserData} from "../ETL/extractUserData.mjs";
import {getCellCoords} from "nd_frontend/generics/helpers.mjs";
import {getAllUsers} from "../actions/users.mjs";

export default async function usersTable(table) {

    const usersRaw = await getAllUsers() // Action that fetches the users from the API

    table.headers = ["name", "age", "country", "checklists"]
    table.rows = setRows(usersRaw, table)

    table.clickHandler = userTableClickHandler
    table.data = usersRaw
    table.sortPerHeader = sortPerHeader

    return table
}

async function userTableClickHandler(event) {

    const coords = getCellCoords(event)
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
            if(Array.isArray(userData[i])) row.push(userData[i].join(",<br>"))
            else row.push(userData[i])
        }

        return row
    })
}