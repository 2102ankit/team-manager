// routes/teamRoutes.js

const express = require("express");
const router = express.Router();
const {
  createTeam,
  getTeamById,
  getTeams,
} = require("../controllers/teamController");
const validateTeamMembers = require("../middleware/validateTeam");

// router.post("/", validateTeamMembers, createTeam);
router.post("/", createTeam);
router.get("/:id", getTeamById);
router.get("/", getTeams);

module.exports = router;
