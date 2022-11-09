import { userService } from "../../services/userService";
import { userConstant } from "../constants";

const getUserDatils = () => {
  return (dispatch) => {
    userService
      .getUserDatils()
      .then((res) => {
        
        dispatch({type:userConstant.GET_USER,payload:res.data})
      })
      .catch((err) => {
        
      });
  };
};
export const userAction={
    getUserDatils
}
