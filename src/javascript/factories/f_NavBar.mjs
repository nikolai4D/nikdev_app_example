import {NavBar} from "nd_frontend/framework/generics/frontend/organisms/NavBar.mjs";
import {router} from "../index.mjs";

export function f_NavBar() {

    let routes = new Map([
        ["Login", "login"],
        ["Dashboard", "dashboard"],
        ["User", "user"]
    ])

    return new NavBar(routes,router)
}
