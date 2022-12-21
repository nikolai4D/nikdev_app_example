const express = require("express");
const router = express.Router();


router.use("/vehicles", require("./vehicles.js"));
router.use("/users", require("./users.js"));
router.use("/checklists", require("./checklists.js"));

module.exports = router;