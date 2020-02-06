import React, { Component } from "react";
import SignUp from "./Components/SignupComponent";
import HomePage from "./Components/HomePage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SignUp} />
          <Route pathc="/home" component={HomePage} />
        </Switch>
      </BrowserRouter>
    );
  }
}
