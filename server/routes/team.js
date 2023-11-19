// routes/teamRoutes.js

const express = require("express");
const router = express.Router();
const Team = require("../models/Team");

// router.post("/", validateTeamMembers, createTeam);
router.post("/", async (req, res) => {
  const { teamName, members } = req.body;
  console.log("Error idhar hai 1");

  // Check if team name is provided and members array is not empty
  if (!teamName || members.length === 0) {
    return res
      .status(400)
      .json({ error: "Team name and members are required." });
  }
  console.log("Error idhar hai 2");
  // Check for unique domains and availability
  // const uniqueDomains = new Set();
  // const uniqueAvailabilities = new Set();

  // for (const member of members) {
  //   if (
  //     uniqueDomains.has(member.domain) ||
  //     uniqueAvailabilities.has(member.availability)
  //   ) {
  //     return res
  //       .status(400)
  //       .json({ error: "Members with duplicate domain or availability." });
  //   }

  //   uniqueDomains.add(member.domain);
  //   uniqueAvailabilities.add(member.availability);
  // }
  console.log("Error idhar hai 3");

  // Create a new team
  const newTeam = {
    teamName,
    members,
  };

  console.log(newTeam);
  // Add the new team to MongoDB Atlas
  try {
    console.log("Error idhar hai");
    const result = await Team.create(newTeam);
    // newTeam.id = result.insertedId;
    res.status(201).json(result);
  } catch (error) {
    console.error("Error adding team to MongoDB Atlas:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.get("/:id", async (req, res) => {
  const teamId = req.params.id;

  try {
    const team = await Team.findOne({ _id: new ObjectId(teamId) });

    if (!team) {
      return res.status(404).json({ error: "Team not found." });
    }

    res.json(team);
  } catch (error) {
    console.error("Error fetching team details from MongoDB Atlas:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.get("/", async (req, res) => {
  const teamId = req.params.id;

  try {
    const team = await Team.find();

    if (!team) {
      return res.status(404).json({ error: "Team not found." });
    }
    res.json(team);
  } catch (error) {
    console.error("Error fetching team details from MongoDB Atlas:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
