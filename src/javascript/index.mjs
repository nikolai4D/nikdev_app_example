import {Router} from "nd_frontend/framework/core/Router.mjs";
import {route} from "nd_frontend/framework/core/Router.mjs"
import {Login} from "./views/Login.mjs";
import {Dashboard} from "./views/Dashboard.mjs";
import {User} from "./views/User.js";



export const router = new Router([
    route("login", Login),
    route("dashboard", Dashboard),
    route("user", User)
])

const path = window.location.pathname.slice(1)
console.log("path: " , path)

router.goTo(path).then()