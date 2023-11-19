import { useState } from "react";
import "../styles/UserCard.css";

const UserCard = ({ user, handleUserSelect }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleButtonClick = () => {
    handleUserSelect(user);
    setIsSelected(!isSelected); // Toggle the isSelected state
  };

  if (handleUserSelect)
    return (
      <div className={`user-card-container ${isSelected ? "selected" : ""}`}>
        <div className="user-card">
          <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
          <h3>{`${user.first_name} ${user.last_name}`}</h3>
          {/* {console.log(user)} */}
          <p>ID: {user.id}</p>
          <p>Email: {user.email}</p>
          <p>Gender: {user.gender}</p>
          <p>Domain: {user.domain}</p>
          <p className="availability">
            Availability: {user.available ? "Available" : "Not Available"}
          </p>
        </div>
        <button className="add-team" onClick={handleButtonClick}>
          {isSelected ? "Selected" : "Add to Team"}
        </button>
      </div>
    );
  else
    return (
      <div className={`user-card-container ${isSelected ? "selected" : ""}`}>
        <div className="user-card">
          <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
          <h3>{`${user.first_name} ${user.last_name}`}</h3>
          <p>ID: {user.id}</p>
          <p>Email: {user.email}</p>
          <p>Gender: {user.gender}</p>
          <p>Domain: {user.domain}</p>
          <p className="availability">
            Availability: {user.available ? "Available" : "Not Available"}
          </p>
        </div>
      </div>
    );
};

export default UserCard;
