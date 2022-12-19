import {View} from "nd_frontend/framework/core/View.mjs";
import {Default} from "nd_frontend/framework/generics/frontend/templates/Default.mjs";
import {LoginForm} from "nd_frontend/framework/generics/frontend/organisms/LoginForm.mjs";
import {login} from "../actions/authentication.mjs";
import {state} from "../store/state.js";
import {router} from "../index.mjs";

export function Login() {
    View.call(this)

    this.loginForm = new LoginForm(async () => {
        const [username, password] = this.loginForm.getValues()
        await login(username, password)

        if (state.credentials) {
            console.log("credentials: ", state.credentials)
            await router.goTo("dashboard")
        }
        else alert("Wrong credentials")

    },"Username","Password")

    this.template = new Default()
    this.template.components.push(this.loginForm)
}