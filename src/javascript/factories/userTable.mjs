import fetchUsers from "../actions/fetchUsers.mjs";
import {Table} from "nd_frontend/framework/generics/frontend/organisms/Table.mjs";

export default async function userTable() {
    const table = new Table()

    const users = await fetchUsers()

    console.log("users: ", JSON.stringify(users, null, 2))
}