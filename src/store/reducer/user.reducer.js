import { userConstant } from "../constants";

const INITIAL_STATE = {
  user: {
    email: "",
  },
};

export const User_Reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userConstant.GET_USER:
      return {
        user: action.payload,
      };
    default:
      return state;
  }
};
