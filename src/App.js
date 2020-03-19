import React, { useState, useCallback, useEffect } from "react";
import Auth from "./FrontEnd/User/Page/Auth/Auth";
import ProductList from "./FrontEnd/Product/ProductList/ProductList";
import Navbar from "./FrontEnd/Shares/Navbar/Navbar";
import UserList from "./FrontEnd/User/Components/UserList/UserList";
import AddProduct from "./FrontEnd/Product/AddProduct/AddProduct";
import AddCategory from "./FrontEnd/Category/AddCategory/AddCategory";
import CategoryList from "./FrontEnd/Category/CategoryList/CategoryList";
import UpdateCategory from "./FrontEnd/Category/UpdateCategory/UpdateCategory";
import UserProduct from "./FrontEnd/User/Components/UserProduct/UserProduct";
import UpdateProduct from "./FrontEnd/Product/UpdateProduct/UpdateProduct";
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
        <Route path="/" exact component={Auth} />
        <Route path="/products" component={ProductList} />
        <Redirect to="/" />
      </Switch>
    );
  } else if (token && role === "admin") {
    element = (
      <Switch>
        <Route path="/" exact component={UserList} />
        <Route path="/viewCategory" component={CategoryList} />
        <Route path="/addCategory" component={AddCategory} />
        <Route path="/updateCategory/:Id" component={UpdateCategory} />
        <Redirect to="/addCategory" />
      </Switch>
    );
  } else if (token && role === "vendor") {
    element = (
      <Switch>
        <Route path="/add" component={AddProduct} />
        <Route path="/viewProduct" component={UserProduct} />
        <Route path="/updateProduct/:Id" component={UpdateProduct} />
        <Redirect to="/add" />
      </Switch>
    );
  } else {
    element = (
      <Switch>
        <Route path="/products" component={ProductList} />
        <Redirect to="/products" />
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
