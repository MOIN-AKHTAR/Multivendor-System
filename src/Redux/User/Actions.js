import { GETUSER } from "./Type";
import axios from "axios";
export const GetUser = Id => {
  return function(dispatch) {
    axios({
      method: "GET",
      url: `http://localhost:5000/User/${Id}`
    })
      .then(res => {
        dispatch({
          type: GETUSER,
          Payload: res.data.User
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
