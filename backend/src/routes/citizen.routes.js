const express = require("express");
const router = express.Router();

const {
  registerCitizen,
  getCitizenByMemberId,
} = require("../controllers/citizen.controller");

router.post("/register", registerCitizen);
router.get("/card/:memberId", getCitizenByMemberId);

module.exports = router;
