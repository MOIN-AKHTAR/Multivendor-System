import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div id="navbar">
      <div id="Logo">Multivendor System</div>
      <ul>
        <li>
          <Link to="/" className="Links">
            All Items
          </Link>
        </li>
        <li>
          <Link to="/auth" className="Links">
            Authenticate
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
