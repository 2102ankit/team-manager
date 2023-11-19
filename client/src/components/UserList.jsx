import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import { createTeam, createUser } from "../services/api"; // Assuming you have a createUser API function
import "../styles/UserList.css";
import ReactPaginate from "react-paginate";

const UserList = ({ users, setAppliedFilters }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 20;
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const pageCount = Math.ceil(users.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % users.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [teamName, setTeamName] = useState("Team Name");

  const handleUserSelect = (user) => {
    const isDomainUnique = selectedUsers.every((selectedUser) => {
      console.log("selectedUser.domain: " + selectedUser.domain);
      console.log("user.domain:", user.domain);
      return selectedUser.domain !== user.domain;
    });

    if (isDomainUnique && user.available) {
      setSelectedUsers([...selectedUsers, user]);
    } else {
      alert("User with the same domain is selected or User is not available");
    }
  };

  const validateTeamName = () => {
    return teamName.trim() !== "";
  };

  const validateNewUser = (newUser) => {
    // Add your user validation logic here
    // Example: Check if the required fields are not empty
    return (
      newUser.first_name.trim() !== "" &&
      newUser.last_name.trim() !== "" &&
      newUser.email.trim() !== ""
    );
  };

  const createNewUser = async (newUser) => {
    if (validateNewUser(newUser)) {
      try {
        // Call your API function to create a new user
        await createUser(newUser);
        // You may want to fetch the updated user list after creating a new user
        // Update the user list in your component state accordingly
        alert("User Created Successfully");
        location.reload();
      } catch (error) {
        console.log("Error in creating user: ", error);
      }
    } else {
      alert("Invalid input. Please check user details.");
    }
  };

  const createNewTeam = async () => {
    if (selectedUsers.length > 0 && validateTeamName()) {
      const team = {
        teamName: teamName,
        members: selectedUsers,
      };
      try {
        await createTeam(team);
        setAppliedFilters({
          domain: "",
          gender: "",
          available: "",
        });
        alert("Team Created", team);
        location.reload();
      } catch (error) {
        console.log("Error in creating team: ", error);
      }
    } else {
      alert("Invalid input. Please check team name and selected users.");
    }
  };

  return (
    <div className="user-list">
      <div className="team-section">
        <h2>Create Team</h2>
        <input
          value={teamName}
          type="text"
          onChange={(e) => {
            setTeamName(e.target.value);
          }}
        />
        <button onClick={createNewTeam}>Create Team</button>
      </div>

      <div className="user-cards">
        {/* PAGINCATION TO BE ADDED HERE */}
        {/* {users.slice(firstUserIndex, lastUserIndex).map((user) => ( */}
        {users.slice(itemOffset, endOffset).map((user) => (
          <div key={user.id}>
            <UserCard user={user} handleUserSelect={handleUserSelect} />
          </div>
        ))}
        <ReactPaginate
          breakLabel="..."
          nextLabel="NEXT >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="< PREV"
          renderOnZeroPageCount={null}
          className="react-paginate"
        />
      </div>

      {/* Form for adding a new user */}
      <div className="add-user-form">
        <h2>Add User</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const newUser = {
              id: Number(formData.get("id")),
              first_name: formData.get("first_name"),
              last_name: formData.get("last_name"),
              email: formData.get("email"),
              gender: formData.get("gender"),
              avatar: formData.get("avatar"),
              domain: formData.get("domain"),
              available: formData.get("available") === "true",
            };
            createNewUser(newUser);
          }}
        >
          <label>ID:</label>
          <input type="number" name="id" required />
          <label>First Name:</label>
          <input type="text" name="first_name" required />
          <label>Last Name:</label>
          <input type="text" name="last_name" required />
          <label>Email:</label>
          <input type="email" name="email" required />
          <label>Gender:</label>
          <select name="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="agender">Agender</option>
          </select>
          <label>Avatar:</label>
          <input type="text" name="avatar" />
          <label>Domain:</label>
          <input type="text" name="domain" />
          <label>Available:</label>
          <select name="available">
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          <button type="submit">Add User</button>
        </form>
      </div>
    </div>
  );
};

export default UserList;
