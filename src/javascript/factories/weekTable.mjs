import {slot} from "nd_frontend/core/helpers.mjs";
import TextInput from "nd_frontend/generics/components/atoms/TextInput.mjs";

export function weekTable(table) {

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

    table.headers = ["week", "tasks", "note"]
    table.rows = setRows(table, data)

    table.data = table

    table.bindScript = function() {
        // this.element.addEventListener("click", (event)=> this.clickHandler(event))
        this.element.querySelectorAll("[data-slot]").forEach(slot => {
            const slotName = slot.dataset.slot
            const inputField =  new TextInput("text", slotName)
            slot.replaceWith(inputField.getElement())
        })
    }

    return table
}

function setRows(table, data){
    return data.map((schedule, i) => {
        const row = []


        const note = schedule.note ?? slot((i+1) + "-note")
        row.push(schedule.day, schedule.task , note)


        return row
    })
}