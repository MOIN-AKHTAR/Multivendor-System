import { createStore, combineReducers, applyMiddleware } from "redux";
import Thunk from "redux-thunk";
import { userReducer } from "./User/Reducer";

const Store = createStore(
  combineReducers({
    UserData: userReducer
  }),
  applyMiddleware(Thunk)
);
export default Store;
