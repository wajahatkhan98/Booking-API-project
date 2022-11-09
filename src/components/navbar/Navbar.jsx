import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import { userConstant } from "../../store/constants";
import { userAction } from "../../store/action/user.action";
import { useAuth0 } from "@auth0/auth0-react";
const Navbar = () => {
  const { user, isLoading, isAuthenticated, loginWithPopup, logout } =
    useAuth0();
  const users = useSelector((state) => state?.User_Reducer?.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const onLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: userConstant.GET_USER, payload: {} });
  };
  useEffect(() => {
    dispatch(userAction.getUserDatils());
  }, []);
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <img style={{ width: 150 }} src="/images/jumalogo.png" />
        </Link>
        {isAuthenticated ? (
          <div className="user-info-main">
            {console.log(user)}
            <div className="user-info">
              <img src={user?.picture} alt="" />
              <span>{user?.name}</span>
            </div>
            <button
              onClick={() => logout({ returnTo: window.location.origin })}
              className="logout-btn"
            >
              Logout
            </button>
          </div>
        ) : (
          <button onClick={() => loginWithPopup()} className="login-btn">
            LogIn
          </button>
        )}
        {/* {user?.email ? (
          <div>
            <span>{user.email}</span>
            <button onClick={onLogout}>logout</button>
          </div>
        ) : (
          <div className="navItems">
            <Link
              to="/register"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <button className="navButton">Register</button>
            </Link>
            <Link
              to="/login"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <button className="navButton">Login</button>
            </Link>
          </div> 
        )}*/}
      </div>
    </div>
  );
};

export default Navbar;
