import {getChecklistsRelatedToUser} from "../actions/checklists.mjs";
import {extractUserData} from "../ETL/extractUserData.mjs";
import {extractChecklistData} from "../ETL/extractChecklistData.mjs";

export async function checklistTable(table, user) {
    const   rawChecklists = await getChecklistsRelatedToUser(user),
            checklists = rawChecklists.map(checklist => extractChecklistData(checklist))


    console.log(checklists)

    table.headers = ["checklist", "tasks"]
    table.rows = setRows(checklists, table)

    // table.clickHandler = userTableClickHandler
    table.data = checklists

    return table
}


function setRows(data, table){

    return data.map(checklist => {
        const row = []
        console.log(checklist)

        for (let i of table.headers){
            if(Array.isArray(checklist[i])) row.push(checklist[i].join(",<br>"))
            else row.push(checklist[i])
        }

        return row
    })
}