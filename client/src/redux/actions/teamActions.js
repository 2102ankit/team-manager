// teamActions.js

import { SELECT_TEAM_MEMBER, CREATE_TEAM } from "../types/actionTypes";

export const selectTeamMember = (user) => ({
  type: SELECT_TEAM_MEMBER,
  payload: user,
});

export const createTeam = () => ({
  type: CREATE_TEAM,
});
