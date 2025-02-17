const express = require("express");
const {
  createResidency,
  getAllResidencies,
  getResidency,
} = require("../controllers/residencyController");
const jwtCheck = require("../config/auth0Config");

const router = express.Router();

router.post("/create", jwtCheck, createResidency);
router.get("/allresd", getAllResidencies);
router.get("/:id", getResidency);

module.exports = router;
