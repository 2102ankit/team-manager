// controllers/teamController.js

const Team = require("../models/Team");
const User = require("../models/User");

const createTeam = async (req, res) => {
  try {
    const teamMembers = await User.find({ _id: { $in: req.body.members } });

    // Validate team members using the middleware
    // if (!validateTeamMembers(teamMembers)) {
    //   return res.status(400).json({
    //     error:
    //       "Selected team members must have unique domains and availability",
    //   });
    // }

    console.log(req.body.teamMembers);
    console.log(req.body.teamMembers);
    const newTeam = await Team.create({
      teamName: req.body.teamName,
      members: teamMembers,
    });

    res.status(201).json(newTeam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate("members");
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTeams = async (req, res) => {
  try {
    const team = await Team.find().populate("members");
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Validate team members middleware
const validateTeamMembers = (teamMembers) => {
  const domains = new Set();
  const availabilities = new Set();

  for (const member of teamMembers) {
    if (domains.has(member.domain) || availabilities.has(member.available)) {
      return false; // Non-unique domain or availability
    }
    domains.add(member.domain);
    availabilities.add(member.available);
  }

  return true;
};

module.exports = { createTeam, getTeamById, validateTeamMembers, getTeams };
