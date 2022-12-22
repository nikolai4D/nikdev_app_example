import {slot} from "nd_frontend/core/helpers.mjs";
import TextInput from "nd_frontend/generics/components/atoms/TextInput.mjs";

/**
 * This table demonstrates how to include component inside the cells of a table. Here input fields are set when there is no already notes written.
 * @param table
 * @returns {*}
 */
export function weekTable(table) {

    // The followings data will be used to fill the table. In a real case scenario, this data will likely be fetched from the store or the server.
    const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        tasks = ["task1", "task2", "task3", "task4", "task5", "task6", "task7"],
        note = ["red", undefined, "green", undefined, undefined, "purple", "pink"]

    const data = week.map((day, i) => {
        return {
            day,
            task: tasks[i],
            note: note[i]
        }
    })

    table.headers = ["week", "tasks", "note"] // Set the headers of the table. These strings will be directly written into the cells
    table.rows = setRows(table, data) //Set the rows. Directly assigning strings would work but here we wants to insert components, so we need a bit more logic.


    table.data = data // assign data to the table component. It comes particularly useful when we want to store for example filters or a specific order of the data.

    table.bindScript = function() {
        // this.element.addEventListener("click", (event)=> this.clickHandler(event))
        this.element.querySelectorAll("[data-slot]").forEach(slot => { // for each element with a data-slot attribute, generated in the setRow function, replace it with an input component.
            const slotName = slot.dataset.slot
            const inputField =  new TextInput("text", slotName)
            slot.replaceWith(inputField.getElement())
        })
    }

    return table
}

/**
 *
 * @param table
 * @param data
 * @returns {*} an array of arrays of html strings that will be inserted into td cells.
 */
function setRows(table, data){
    return data.map((schedule, i) => {
        const row = []


        const note = schedule.note ?? slot((i+1) + "-note")
        row.push(schedule.day, schedule.task , note)


        return row
    })
}