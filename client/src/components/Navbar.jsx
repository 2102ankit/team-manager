// src/Navbar.js
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link className="link" to="/">
            Users
          </Link>
        </li>
        <li>
          <Link className="link" to="/team">
            Teams
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
