require("dotenv").config();
const axios = require("axios");

async function apiCallPost(reqBody, url) {
    let response;

    console.log("url: " + process.env.COS_URL + url)
    try {
        response = await axios.post(process.env.COS_URL + url, reqBody, {
            withCredentials: true,
            credentials: "include",
            headers: {
                "apikey": "abcdefghijklmnopqrstuvwxyz"
            }
        });

    } catch (err) {
        // Handle Error Here
        response = err.response.data;
        console.log("catch apiCallPost ", reqBody);
    }
    return response;
}

module.exports = { apiCallPost };