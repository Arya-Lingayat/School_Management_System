const express = require("express");
const { addSchool, listSchools } = require("./../controllers/schoolController");

const router = express.Router();

router.post("/addSchool", addSchool);
router.get("/listSchools/:lat/:lng", listSchools);

module.exports = router;
