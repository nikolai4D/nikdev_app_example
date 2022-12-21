import {router} from "../index.mjs";
import {NavBar} from "nd_frontend/generics/components/organisms/NavBar.mjs";

export function defaultNavBar() {

    let routes = new Map([
        ["Vehicles", "vehicles"],
        ["Login", "login"],
        ["Dashboard", "dashboard"],
        ["Checklists", "checklists"]
    ])

    return new NavBar(routes,router)
}
