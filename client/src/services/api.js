// services/api.js

import axios from "axios";
import dotenv from "dotenv";

const api = axios.create({
  baseURL: "http://localhost:3001/api", // Update with your backend server URL
});

export const getUsers = (page, limit, filters) => {
  const params = { page, limit, ...filters };
  return api.get("/users", { params });
};

export const getUserById = (id) => {
  return api.get(`/users/${id}`);
};

export const createUser = (user) => {
  return api.post("/users", user);
};

export const updateUser = (id, user) => {
  return api.put(`/users/${id}`, user);
};

export const deleteUser = (id) => {
  return api.delete(`/users/${id}`);
};

export const createTeam = (team) => {
  return api.post("/team", team);
};

export const getTeamById = (id) => {
  return api.get(`/team/${id}`);
};

export const getTeams = () => {
  return api.get(`/team/`);
};
