// middleware/validateTeam.js

const validateTeamMembers = (req, res, next) => {
  const teamMembers = req.body.members;

  const domains = new Set();
  const availabilities = new Set();

  for (const memberId of teamMembers) {
    User.findById(memberId)
      .then((user) => {
        if (!user) {
          return res
            .status(404)
            .json({ error: `User with ID ${memberId} not found` });
        }

        if (domains.has(user.domain) || availabilities.has(user.available)) {
          return res
            .status(400)
            .json({
              error:
                "Selected team members must have unique domains and availability",
            });
        }

        domains.add(user.domain);
        availabilities.add(user.available);

        if (domains.size === teamMembers.length) {
          next();
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }
};

module.exports = validateTeamMembers;
