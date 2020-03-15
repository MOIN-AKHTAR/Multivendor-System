import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { Link } from "react-router-dom";
import "./SideNavBar.css";

function SideNavBar(props) {
  const Auth = useContext(AppContext);
  return (
    // Here ShowSideNavBar Is A FunctionWhihc Will Be Called When Yiu Click On SideNavBar's List Item-
    <div id="Side_Nav_Bar" onClick={props.ShowSideNavBar}>
      <li>
        <Link to="/" className="Side_Links">
          All Items
        </Link>
      </li>
      {!Auth.isLoggedIn && (
        <li>
          <Link to="/auth" className="Side_Links">
            Authenticate
          </Link>
        </li>
      )}
      {Auth.isLoggedIn && (
        <li>
          <Link to="/auth" className="Side_Links" onClick={Auth.logOut}>
            Logout
          </Link>
        </li>
      )}
    </div>
  );
}

export default SideNavBar;
