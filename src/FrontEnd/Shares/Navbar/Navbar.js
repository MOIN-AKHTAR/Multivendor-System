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
          {(!Auth.isLoggedIn || (Auth.isLoggedIn && Auth.role === "user")) && (
            <li>
              <Link to="/" className="Links">
                All Items
              </Link>
            </li>
          )}

          {Auth.isLoggedIn && Auth.role === "admin" && (
            <li>
              <Link to="/" className="Links">
                View Vendors
              </Link>
            </li>
          )}
          {Auth.isLoggedIn && Auth.role === "admin" && (
            <li>
              <Link to="/addCategory" className="Links">
                Add Category
              </Link>
            </li>
          )}
          {Auth.isLoggedIn && Auth.role === "admin" && (
            <li>
              <Link to="/viewCategory" className="Links">
                Categories
              </Link>
            </li>
          )}
          {!Auth.isLoggedIn && (
            <li>
              <Link to="/auth" className="Links">
                Authenticate
              </Link>
            </li>
          )}
          {Auth.isLoggedIn && Auth.role === "vendor" && (
            <li>
              <Link to="/add" className="Links">
                Add Item
              </Link>
            </li>
          )}
          {Auth.isLoggedIn && Auth.role === "vendor" && (
            <li>
              <Link to="#" className="Links">
                View Item
              </Link>
            </li>
          )}
          {Auth.isLoggedIn && Auth.role === "vendor" && (
            <li>
              <Link to="#" className="Links">
                View Sell
              </Link>
            </li>
          )}
          {Auth.isLoggedIn && Auth.role === "user" && (
            <li>
              <Link to="#" className="Links">
                Cart
              </Link>
            </li>
          )}
          {/* {Auth.isLoggedIn && (
            <li>
              <Link>
                <img
                  src={Auth.img}
                  alt="no-preview"
                  style={{
                    display: "inline-block",
                    width: "50px",
                    height: "50px"
                  }}
                />
              </Link>
            </li>
          )} */}
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
