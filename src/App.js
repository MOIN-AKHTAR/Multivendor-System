import React from "react";
import Auth from "./FrontEnd/User/Page/Auth/Auth";
import UserList from "./FrontEnd/User/Components/UserList/UserList";
import Navbar from "./FrontEnd/Shares/Navbar/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={UserList} />
        <Route path="/auth" component={Auth} />
      </Switch>
    </Router>
  );
}
