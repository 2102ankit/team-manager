import { useEffect, useState } from "react";
import { getTeams, getUserById } from "../services/api";
import Navbar from "./Navbar";
import UserCard from "./UserCard";
import "../styles/TeamListPage.css";

const TeamListPage = () => {
  const [teams, setTeams] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  useEffect(() => {
    const fetchTeamsFromAPI = async () => {
      try {
        const response = await getTeams();
        setTeams(response.data);
        // setLoading(false);
      } catch (error) {
        // setError(error.message);
        // setLoading(false);
        console.log(error);
      }
    };

    fetchTeamsFromAPI();
  }, []);

  useEffect(() => {
    const fetchMembersFromAPI = async (teams) => {
      try {
        const memberPromises = teams.map(async (team) => {
          const teamMembersPromises = team.members.map(async (id) => {
            const user = await getUserById(id);
            return user.data; // Assuming user.data contains the user details
          });

          const teamMembers = await Promise.all(teamMembersPromises);

          return {
            teamName: team.teamName,
            members: teamMembers,
          };
        });

        const teamMembersData = await Promise.all(memberPromises);
        setTeamMembers(teamMembersData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMembersFromAPI(teams);
  }, [teams]);

  return (
    <div>
      <Navbar />
      <h1>Teams</h1>
      {teams.map((team) => (
        <div key={team._id}>
          <h2>Team Details</h2>
          <p>Team Name: {team.teamName}</p>
          <p>Members:</p>

          {teamMembers.map((memberItem) => {
            if (memberItem.teamName === team.teamName) {
              return (
                <ul key={team._id}>
                  {memberItem.members.map((member) => (
                    <UserCard key={member._id} user={member} />
                  ))}
                </ul>
              );
            }
            return null; // Make sure to return null if the condition is not met
          })}
        </div>
      ))}
    </div>
  );
};

export default TeamListPage;
