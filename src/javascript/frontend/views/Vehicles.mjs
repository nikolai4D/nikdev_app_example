import {View} from "nd_frontend/core/View.mjs";
import {router} from "../../index.mjs";
import {Button} from "nd_frontend/generics/components/atoms/Button.mjs";
import {Default} from "nd_frontend/generics/components/templates/Default.mjs";
import {Header} from "nd_frontend/generics/components/atoms/Header.mjs";
import {defaultNavBar} from "../../factories/defaultNavBar.mjs";
import {Table} from "nd_frontend/generics/components/organisms/Table.mjs";
import {getAllVehicles} from "../../actions/vehicles.mjs";

export function Vehicles() {
    View.call(this)

    this.title = "Vehicles"

    this.navBar = defaultNavBar()
    this.header = new Header(1,"Vehicles")
    this.vehicleTable = new Table()
    this.button = new Button("Go To Dashboard Page", async () => { await router.goTo("dashboard") })

    this.loadData = async function () {

        this.vehicles = await getAllVehicles()
        this.vehicleTable.headers = ["name", "email", "color", "year"]
        this.vehicleTable.rows = this.vehicles.map(vehicle => [vehicle.id, vehicle.owner, vehicle.color, vehicle.year])
        this.vehicleTable.data = this.vehicles
    }

    this.template = new Default()
    this.template.components.push(this.navBar, this.header, this.vehicleTable, this.button)

}