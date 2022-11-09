import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/action/auth.action";
import { useEffect } from "react";
import { MutatingDots } from "react-loader-spinner";
import OAuth2Login from "react-simple-oauth2-login";
import FacebookLogin from "react-facebook-login";
import Links from "../../components/Links/links";
import { useAuth0 } from "@auth0/auth0-react";
const Login = () => {
  const { user,isLoading,isAuthenticated,loginWithPopup } = useAuth0();
  const onSuccess = (response) => {
    
  }

  const onFailure = (response) => console.error(response);
  const path = useLocation();
  const users = useSelector((state) => state?.User_Reducer?.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
    confirm_password: undefined,
  });
  const [availableEmail, setAvailableEmail] = useState(null);
  const [isLoginPage, setIsLoginPage] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (availableEmail == null) {
      
      if (credentials.email == "") {
        alert("please enter email");
        return;
      }
      setLoading(true);
      dispatch(
        authAction.checkEmail(credentials.email, setAvailableEmail, setLoading)
      );
    } else if (availableEmail == false) {
      
      if (credentials.email == "" || credentials.password == "") {
        alert("please enter all fields");
        return;
      }
      setLoading(true);
      dispatch(authAction.login(credentials, navigate, setLoading));
      return;
    } else if (availableEmail === true) {
      
      if (credentials.password !== credentials.confirm_password) {
        alert("password does not match");
        return;
      }
      if (credentials.email == "" || credentials.password == "") {
        alert("please enter all fields");
        return;
      }
      setLoading(true);
      dispatch(authAction.register(credentials, setLoading));
      return;
    }
  };
  const location = useLocation();
  useEffect(() => {
    path.pathname == "/login" ? setIsLoginPage(true) : setIsLoginPage(false);
  }, []);
  const token = localStorage.getItem("token");
  if (token) {
    
    return <Navigate to={"/"} />;
  }
  const responseGoogle = (response) => {
    
  };

  return (
    <>
      <Navbar />
      <Links />
      <div className="login">
        <div className="lContainer">
          <h2>SignIn or Create an Account </h2>
          <input
            type="email"
            placeholder="email"
            id="email"
            onChange={handleChange}
            className="lInput"
          />
          {(availableEmail == true || availableEmail == false) && (
            <input
              type="password"
              placeholder="password"
              id="password"
              onChange={handleChange}
              className="lInput"
            />
          )}
          {availableEmail == true && (
            <input
              type="password"
              placeholder="confirm password"
              id="confirm_password"
              onChange={handleChange}
              className="lInput"
            />
          )}
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <MutatingDots
                height="100"
                width="100"
                color="#800080"
                secondaryColor="#800080"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          ) : (
            <button className="continue" onClick={handleClick}>
              {availableEmail == null
                ? "Check email"
                : availableEmail == false
                ? "Continue with email"
                : "Create an Account"}
            </button>
          )}
        </div>
        <div className="other-options">
          {/* <GoogleLogin
            clientId="279136350288-vd52prf2ig2hc1ofvsh15mrk4mmi45kc.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          /> */}
          <button onClick={() => loginWithPopup()}>Log In</button>
          {/* <FacebookLogin
            appId="5529475650479012"
            autoLoad={true}
            fields="name,email,picture"
            callback={() => onSuccess()}
            cssClass="facebook-button"
            icon="fa-facebook"
          /> */}
        </div>
      </div>
    </>
  );
};

export default Login;
