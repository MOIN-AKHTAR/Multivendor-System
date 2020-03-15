import React, { useState, useCallback, useContext } from "react";
import SideNavBar from "../SideNavBar/SideNavBar";
import Background from "../Background/Background";
import { AppContext } from "../Context/AppContext";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const Auth = useContext(AppContext);
  const [showSideNavBar, setShowSideNavBar] = useState(false);
  const ShowSideNavBar = useCallback(() => {
    setShowSideNavBar(prev => !prev);
  }, []);
  return (
    <div>
      {showSideNavBar && (
        <>
          <Background />
          <SideNavBar ShowSideNavBar={ShowSideNavBar} />
        </>
      )}
      <div id="navbar">
        <div id="Logo_Btn__Section">
          <div id="Side_Btn" onClick={ShowSideNavBar}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div id="Logo">Multivendor System</div>
        </div>
        <ul>
          <li>
            <Link to="/" className="Links">
              All Items
            </Link>
          </li>
          {!Auth.isLoggedIn && (
            <li>
              <Link to="/auth" className="Links">
                Authenticate
              </Link>
            </li>
          )}
          {Auth.isLoggedIn && (
            <li>
              <Link to="#" className="Links" onClick={Auth.logOut}>
                Logout
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
