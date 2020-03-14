import React from "react";
import { Link } from "react-router-dom";
import "./SideNavBar.css";

function SideNavBar() {
  return (
    <div id="Side_Nav_Bar">
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
    </div>
  );
}

export default SideNavBar;
