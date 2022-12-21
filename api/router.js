const express = require("express");
const router = express.Router();


router.use("/vehicles", require("./vehicles.js"));
router.use("/users", require("./users.js"));

module.exports = router;