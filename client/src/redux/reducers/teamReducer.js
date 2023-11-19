// teamReducer.js

import { SELECT_TEAM_MEMBER, CREATE_TEAM } from "../types/actionTypes";

const initialState = {
  teamMembers: [],
};

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_TEAM_MEMBER: {
      const selectedUser = action.payload;
      const isUserInTeam = state.teamMembers.find(
        (user) =>
          user.domain === selectedUser.domain &&
          user.available === selectedUser.available
      );
      return isUserInTeam
        ? state
        : {
            ...state,
            teamMembers: [...state.teamMembers, selectedUser],
          };
    }
    case CREATE_TEAM: {
      return {
        ...state,
        teamMembers: [],
      };
    }
    default:
      return state;
  }
};

export default teamReducer;
