import {f_NavBar} from "../../factories/f_NavBar.mjs";
import {router} from "../../index.mjs";
import {View} from "nd_frontend/core/View.mjs";
import {Header} from "nd_frontend/generics/components/atoms/Header.mjs";
import {Default} from "nd_frontend/generics/components/templates/Default.mjs";

export function User() {
    View.call(this)

    this.title = "User"

    this.navBar = f_NavBar()
    this.header = new Header(1,"User")
    this.button = new Button("Go To Dashboard Page", async () => { await router.goTo("dashboard") })


    this.template = new Default()
    this.template.components.push(this.navBar, this.header, this.button)

}