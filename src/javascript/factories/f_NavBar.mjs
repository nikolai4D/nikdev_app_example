import {router} from "../index.mjs";
import {NavBar} from "nd_frontend/generics/components/organisms/NavBar.mjs";

export function f_NavBar() {

    let routes = new Map([
        ["Login", "login"],
        ["Dashboard", "dashboard"],
        ["User", "user"]
    ])

    return new NavBar(routes,router)
}
