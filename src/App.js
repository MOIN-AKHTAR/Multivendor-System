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
import ViewProduct from "./FrontEnd/Product/ViewProduct/ViewProduct";
import CartList from "./FrontEnd/Product/CartList/CartList";
import UpdateUser from "./FrontEnd/User/Components/UpdateUser/UpdateUser";
import ChangeEmail from "./FrontEnd/User/Components/ChangeEmail/ChangeEmail";
import ChangePassword from "./FrontEnd/User/Components/ChangePassword/ChangePassword";
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
  const [image, setImage] = useState();
  const logIn = useCallback((Id, Token, Role, Image) => {
    setIsLoggedIn(true);
    setLoggedInUser(Id);
    setToken(Token);
    setRole(Role);
    setImage(Image);
  }, []);
  const logOut = useCallback(() => {
    localStorage.removeItem("UserDetail");
    setIsLoggedIn(false);
    setLoggedInUser(null);
    setToken(null);
    setRole(null);
    setImage(null);
  }, []);
  useEffect(() => {
    const User = JSON.parse(localStorage.getItem("UserDetail"));
    if (User) {
      logIn(User.Id, User.Token, User.Role, User.Image);
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
        <Route path="/getMe" component={UpdateUser} />
        <Route path="/email" component={ChangeEmail} />
        <Route path="/password" component={ChangePassword} />
        <Redirect to="/addCategory" />
      </Switch>
    );
  } else if (token && role === "vendor") {
    element = (
      <Switch>
        <Route path="/add" component={AddProduct} />
        <Route path="/viewProduct" component={UserProduct} />
        <Route path="/updateProduct/:Id" component={UpdateProduct} />
        <Route path="/getMe" component={UpdateUser} />
        <Route path="/email" component={ChangeEmail} />
        <Route path="/password" component={ChangePassword} />
        <Redirect to="/add" />
      </Switch>
    );
  } else {
    element = (
      <Switch>
        <Route path="/products" component={ProductList} />
        <Route path="/view/:Id" component={ViewProduct} />
        <Route path="/cart" component={CartList} />
        <Route path="/getMe" component={UpdateUser} />
        <Route path="/email" component={ChangeEmail} />
        <Route path="/password" component={ChangePassword} />
        <Redirect to="/products" />
      </Switch>
    );
  }
  return (
    <AppContext.Provider
      value={{ isLoggedIn, loggedInUser, token, role, image, logIn, logOut }}
    >
      <Router>
        <Navbar />
        {element}
      </Router>
    </AppContext.Provider>
  );
}
