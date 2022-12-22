import {Login} from "./frontend/views/Login.mjs";
import {Dashboard} from "./frontend/views/Dashboard.mjs";
import {Checklists} from "./frontend/views/Checklists.js";
import {loggedInGuard} from "./frontend/guards/loggedInGuard.mjs";
import {route, Router} from "nd_frontend/core/Router.mjs";
import {Vehicles} from "./frontend/views/Vehicles.mjs";



export const router = new Router([
    route("vehicles", Vehicles), // route is just an object with 3 props. It s made a function to help people writing correctly.
    route("login", Login),
    route("dashboard", Dashboard),
    route("checklists", Checklists, loggedInGuard) // 3rd argument is a guard. It is optional.
])

const path = window.location.pathname.slice(1)
console.log("path: " , path)

router.goTo(path).then() // Go to the path provided in the url. If no view match, goes to the first view.