import React, { useState, useCallback, useEffect } from "react";
import Auth from "./FrontEnd/User/Page/Auth/Auth";
import UserList from "./FrontEnd/User/Components/UserList/UserList";
import Navbar from "./FrontEnd/Shares/Navbar/Navbar";
import AddProduct from "./FrontEnd/Product/AddProduct/AddProduct";
import AddCategory from "./FrontEnd/Category/AddCategory/AddCategory";
import CategoryList from "./FrontEnd/Category/CategoryList/CategoryList";
import UpdateCategory from "./FrontEnd/Category/UpdateCategory/UpdateCategory";
import { AppContext } from "./FrontEnd/Shares/Context/AppContext";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState();
  const [token, setToken] = useState();
  const [role, setRole] = useState();
  const logIn = useCallback((Id, Token, Role) => {
    setIsLoggedIn(true);
    setLoggedInUser(Id);
    setToken(Token);
    setRole(Role);
  }, []);
  const logOut = useCallback(() => {
    localStorage.removeItem("UserDetail");
    setIsLoggedIn(false);
    setLoggedInUser(null);
    setToken(null);
    setRole(null);
  }, []);
  useEffect(() => {
    const User = JSON.parse(localStorage.getItem("UserDetail"));
    if (User) {
      logIn(User.Id, User.Token, User.Role);
    }
  }, [logIn]);
  let element;
  if (!token) {
    element = (
      <Switch>
        <Route path="/" exact component={UserList} />
        <Route path="/auth" component={Auth} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    element = (
      <Switch>
        <Route path="/" exact component={UserList} />
        <Route path="/viewCategory" exact component={CategoryList} />
        <Route path="/addCategory" component={AddCategory} />
        <Route path="/add" component={AddProduct} />
        <Route path="/updateCategory/:Id" component={UpdateCategory} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <AppContext.Provider
      value={{ isLoggedIn, loggedInUser, token, role, logIn, logOut }}
    >
      <Router>
        <Navbar />
        {element}
      </Router>
    </AppContext.Provider>
  );
}
