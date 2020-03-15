import { createContext } from "react";

export const AppContext = createContext({
  isLoggedIn: false,
  loggedInUser: null,
  token: null,
  logIn: () => {},
  logOut: () => {}
});
