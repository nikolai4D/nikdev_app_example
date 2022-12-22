import {state} from "../../store/state.js";
import {router} from "../../index.mjs";
import {View} from "nd_frontend/core/View.mjs";
import {LoginForm} from "nd_frontend/generics/components/organisms/LoginForm.mjs";
import {Default} from "nd_frontend/generics/components/templates/Default.mjs";
import {login} from "../../actions/users.mjs";

export function Login() {
    View.call(this) // Call the View constructor

    this.loginForm = new LoginForm(
        async () => {
        const [username, password] = this.loginForm.getValues()
        await login(username, password)

        if (state.credentials) {
            console.log("credentials: ", state.credentials)
            await router.goTo("checklists")
        }
        else alert("Wrong credentials")

    },
        "Username",
        "Password")

    this.template = new Default() // Use the Default template, it simply insert all its subcomponents one after the other.
    this.template.components.push(this.loginForm) // Add the login form to the template
}