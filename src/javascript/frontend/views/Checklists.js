import {defaultNavBar} from "../../factories/defaultNavBar.mjs";
import {router} from "../../index.mjs";
import {View} from "nd_frontend/core/View.mjs";
import {Header} from "nd_frontend/generics/components/atoms/Header.mjs";
import {Default} from "nd_frontend/generics/components/templates/Default.mjs";
import {Button} from "nd_frontend/generics/components/atoms/Button.mjs"
import {Table} from "nd_frontend/generics/components/organisms/Table.mjs";
import {state} from "../../store/state";
import {checklistTable} from "../../factories/checklistTable.mjs";
import {weekTable} from "../../factories/weekTable.mjs";

export function Checklists() {
    View.call(this)


    const username = state.credentials
    const capitName = username.charAt(0).toUpperCase() + username.slice(1)

    console.log("username: ", capitName)

    this.title = username + "'s Checklists"

    this.navBar = defaultNavBar()
    this.header = new Header(1,capitName + "'s Checklists")

    this.checklistHeader = new Header(2,"Checklists")
    this.checklistsTable = new Table()

    this.weekHeader = new Header(2,"Weeks")
    this.weekTable = new Table()

    this.button = new Button("Go To Dashboard Page", async () => { await router.goTo("dashboard") })


    this.loadData = async () => {
        await checklistTable(this.checklistsTable, username)
        await weekTable(this.weekTable)
    }

    this.template = new Default()
    this.template.components.push(this.navBar, this.header, this.checklistHeader , this.checklistsTable, this.weekHeader, this.weekTable, this.button)

}