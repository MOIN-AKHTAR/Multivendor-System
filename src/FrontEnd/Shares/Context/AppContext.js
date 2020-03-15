import { createContext } from "react";

export const AppContext = createContext({
  isLoggedIn: false,
  loggedInUser: null,
  token: null,
  role: null,
  logIn: () => {},
  logOut: () => {}
});
