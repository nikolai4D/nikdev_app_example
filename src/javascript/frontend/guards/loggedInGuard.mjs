import {state} from "../../store/state.js";
import {router} from "../../index.mjs";
import {Guard} from "nd_frontend/core/Guard.mjs";


/**
 * This guard checks if the user is logged in.
 */
export function loggedInGuard(){
    Guard.call(this)

    this.control = async (route, params) => {
        const answer = state.credentials !== null

        if (!answer) {
            await router.goTo("login")
        }

        return answer
    }
}