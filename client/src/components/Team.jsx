// Team.js

import React from "react";
 
const Team = ({ teamMembers }) => {
  return (
    <div className="team">
      <h2>Team Members</h2>
      <ul>
        {teamMembers.map((member) => (
          <li key={member.id}>
            {`${member.first_name} ${member.last_name} - ${member.domain} (${
              member.availability ? "Available" : "Not Available"
            })`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Team;
