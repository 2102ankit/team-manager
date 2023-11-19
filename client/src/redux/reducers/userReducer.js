// userReducer.js

import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  SEARCH_USERS,
  APPLY_FILTERS,
} from "../types/actionTypes.js";

const initialState = {
  users: [],
  loading: false,
  error: null,
  filteredUsers: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case FETCH_USERS_SUCCESS: {
      return {
        ...state,
        users: action.payload,
        filteredUsers: action.payload,
        loading: false,
        error: null,
      };
    }
    case FETCH_USERS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case SEARCH_USERS: {
      const searchQuery = action.payload.toLowerCase();
      const filteredUsers = state.users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(searchQuery) ||
          user.last_name.toLowerCase().includes(searchQuery)
      );
      return {
        ...state,
        filteredUsers,
      };
    }
    case APPLY_FILTERS: {
      const { domain, gender, availability } = action.payload;
      const filteredUsersWithFilters = state.users.filter((user) => {
        return (
          (domain ? user.domain === domain : true) &&
          (gender ? user.gender === gender : true) &&
          (availability ? user.available.toString() === availability : true)
        );
      });
      return {
        ...state,
        filteredUsers: filteredUsersWithFilters,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
