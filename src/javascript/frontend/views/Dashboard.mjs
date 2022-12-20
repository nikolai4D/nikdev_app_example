import {View} from "nd_frontend/framework/core/View.mjs";
import {Header} from "nd_frontend/framework/generics/frontend/atoms/Header.mjs";
import {Default} from "nd_frontend/framework/generics/frontend/templates/Default.mjs";
import {Table} from "nd_frontend/framework/generics/frontend/organisms/Table.mjs";
import {getAllVehicles} from "../../actions/vehicles.mjs";
import {f_NavBar} from "../../factories/f_NavBar.mjs";
import Button from "nd_frontend/framework/generics/frontend/atoms/Button.mjs";
import {router} from "../../index.mjs";
import usersTable from "../../factories/usersTable.mjs";

export function Dashboard() {
    View.call(this)

    // This property is used to set the title of the page
    this.title = "Dashboard"

    // These are the components that will be rendered in the view. Keeping a reference to them can be convenient but is not mandatory.
    this.navBar = f_NavBar()
    this.header = new Header(1,"Dashboard")
    this.usersTable = new Table()
    this.vehicleTable = new Table()
    this.button = new Button("Go To User Page", async () => { await router.goTo("user") })

    /*
    * This method is called when the view is rendered. It is used to set the asynchronous content of the view.
     */
    this.loadData = async function () {

        await usersTable(this.usersTable) // Populate with asynchronous data

        this.vehicles = await getAllVehicles()
        this.vehicleTable.headers = ["name", "email", "color", "year"]
        this.vehicleTable.rows = this.vehicles.map(vehicle => [vehicle.id, vehicle.owner, vehicle.color, vehicle.year])
        this.vehicleTable.data = this.vehicles
    }

    this.template = new Default()
    this.template.components.push(this.navBar, this.header, this.usersTable, this.vehicleTable, this.button)

}