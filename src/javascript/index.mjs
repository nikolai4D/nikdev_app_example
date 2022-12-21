import {Login} from "./frontend/views/Login.mjs";
import {Dashboard} from "./frontend/views/Dashboard.mjs";
import {Checklists} from "./frontend/views/Checklists.js";
import {loggedInGuard} from "./frontend/guards/loggedInGuard.mjs";
import {route, Router} from "nd_frontend/core/Router.mjs";
import {Vehicles} from "./frontend/views/Vehicles.mjs";



export const router = new Router([
    route("vehicles", Vehicles),
    route("login", Login),
    route("dashboard", Dashboard),
    route("checklists", Checklists, loggedInGuard)
])

const path = window.location.pathname.slice(1)
console.log("path: " , path)

router.goTo(path).then()