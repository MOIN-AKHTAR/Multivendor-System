import React, { useState, useCallback } from "react";
import Auth from "./FrontEnd/User/Page/Auth/Auth";
import UserList from "./FrontEnd/User/Components/UserList/UserList";
import Navbar from "./FrontEnd/Shares/Navbar/Navbar";
import { AppContext } from "./FrontEnd/Shares/Context/AppContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState();
  const [token, setToken] = useState();
  const logIn = useCallback((Id, Token) => {
    setIsLoggedIn(true);
    setLoggedInUser(Id);
    setToken(Token);
  }, []);
  const logOut = useCallback(() => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
    setToken(null);
  }, []);

  return (
    <AppContext.Provider
      value={{ isLoggedIn, loggedInUser, token, logIn, logOut }}
    >
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={UserList} />
          <Route path="/auth" component={Auth} />
        </Switch>
      </Router>
    </AppContext.Provider>
  );
}
