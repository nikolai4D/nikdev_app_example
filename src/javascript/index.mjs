import {Router} from "nd_frontend/framework/core/Router.mjs";
import {route} from "nd_frontend/framework/core/Router.mjs"
import {Login} from "./frontend/views/Login.mjs";
import {Dashboard} from "./frontend/views/Dashboard.mjs";
import {User} from "./frontend/views/User.js";
import {loggedInGuard} from "./frontend/guards/loggedInGuard.mjs";



export const router = new Router([
    route("login", Login),
    route("dashboard", Dashboard/*, loggedInGuard*/),
    route("user", User)
])

const path = window.location.pathname.slice(1)
console.log("path: " , path)

router.goTo(path).then()