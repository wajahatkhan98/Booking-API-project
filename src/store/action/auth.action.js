import { authService } from "../../services/authService";
import { userAction } from "./user.action";
const login = (data, navigate,setLoading) => {
  return (dispatch) => {
    authService
      .login(data)
      .then((res) => {
        setLoading(false)
        if (res.status == 200) {
          
          localStorage.setItem("token", res?.data?.token);
          dispatch(userAction.getUserDatils());
          navigate("/");
        } else {
          
        }
      })
      .catch((err) => {
        
      });
  };
};
const register = (data, navigate,setLoading) => {
  return (dispatch) => {
    authService
      .register(data)
      .then((res) => {
        setLoading(false)
        if (res.status == 200) {
          
          // localStorage.setItem("token", res?.data?.token);
          // navigate("/");
          window.location.reload();
        } else {
          
        }
      })
      .catch((err) => {
        
      });
  };
};
const checkEmail = (email, setState,setLoading) => {
  return (dispatch) => {
    authService
      .checkEmail(email)
      .then((data) => {
        // navigate("/")
        setLoading(false)
        if (data.status == 200) {
          
          setState(true);
          return;
        } else if (data?.response?.status == 404) {
          
          setState(false);
          return;
        }
      })
      .catch((err) => {
        
      });
  };
};
export const authAction = {
  login,
  checkEmail,
  register,
};
