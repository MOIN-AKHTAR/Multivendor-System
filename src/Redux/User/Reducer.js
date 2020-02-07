import { GETUSER } from "./Type";
export const userReducer = (State = {}, Action) => {
  switch (Action.type) {
    case GETUSER: {
      return {
        User: Action.Payload
      };
    }
    default: {
      return State;
    }
  }
};
