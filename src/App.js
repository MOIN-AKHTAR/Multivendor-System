import React, { Component } from "react";
import SignUp from "./Components/SignupComponent";
import HomePage from "./Components/HomePage";
import Login from "./Components/Login";
import EditProfile from "./Components/EditProfile";
import NotFound from "./Components/NotFound";
import { BrowserRouter, Route, Switch } from "react-router-dom";
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/home/:Id" component={HomePage} />
          <Route path="/editprofile/:Id" component={EditProfile} />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}
