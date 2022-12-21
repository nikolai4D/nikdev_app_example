const express = require("express");
const fs = require("fs");
const router = express.Router();



router.get("/", (req, res) => {
    console.log("vehicles route")
    const vehiclesFile = JSON.parse(fs.readFileSync('./mockDB/vehicles.json', 'utf8'))
    res.json(vehiclesFile.vehicles)
})

module.exports = router;