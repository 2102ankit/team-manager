import { useEffect, useState } from "react";
import UserList from "./UserList";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import { getUsers } from "../services/api";
import Navbar from "./Navbar";
import "../styles/UserListPage.css";

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [availableDomains, setAvailableDomains] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState({
    domain: "",
    gender: "",
    available: "",
  });

  useEffect(() => {
    const fetchUsersFromAPI = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
        setLoading(false);
        // Extract unique domains from users
        const uniqueDomains = Array.from(
          new Set(response.data.map((user) => user.domain))
        );
        setAvailableDomains(uniqueDomains);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsersFromAPI();
  }, []);

  useEffect(() => {
    // Apply filters and search when users or filters/searchQuery change
    //console.log("unfiltered users : ", users);
    const filtered = users.filter((user) => {
      // Apply search filter
      const matchesSearch = (
        user.first_name +
        user.last_name +
        user.gender +
        user.email +
        user.domain
      )
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // Apply other filters
      const matchesFilters = Object.keys(appliedFilters).every((key) => {
        const userValue = user[key];
        const filterValue = appliedFilters[key];

        // If filter is not selected, consider it a match
        if (!filterValue || filterValue === "") {
          return true;
        }

        // Otherwise, check if the user property matches the filter value
        return (
          userValue.toString().toLowerCase() ===
          filterValue.toString().toLowerCase()
        );
      });

      return matchesSearch && matchesFilters;
    });

    setFilteredUsers(filtered);
  }, [users, searchQuery, appliedFilters]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilters = (filters) => {
    setAppliedFilters(filters);
  };

  return (
    <>
      <Navbar />
      <div className="user-list-page">
        <h1>User List</h1>
        <SearchBar onSearch={handleSearch} />
        <Filters onFilter={handleFilters} availableDomains={availableDomains} />

        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">Error: {error}</p>}
        <UserList users={filteredUsers} setAppliedFilters={setAppliedFilters} />
      </div>
    </>
  );
};

export default UserListPage;
