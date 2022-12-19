import {Router} from "nd_frontend/framework/core/Router.mjs";
import {route} from "nd_frontend/framework/core/Router.mjs"
import {Home} from "./views/Home.mjs";



const router = new Router([
    route("home", Home)
])

const path = window.location.pathname.slice(1)
console.log("path: " , path)

router.goTo(path).then()