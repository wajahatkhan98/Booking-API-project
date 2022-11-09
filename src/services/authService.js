import { API } from "../config/api";
const login = (data) =>
  API.post("/api/auth/login", data).then(
    (res) => res,
    (err) => err
  );
  const register = (data) =>
  API.post("/api/auth/register", data).then(
    (res) => res,
    (err) => err
  );
const checkEmail = (email) =>
  API.get("/api/auth/checkEmail?email="+email, {email}).then(
    (res) => res,
    (err) => err
  );
export const authService={
    login,checkEmail,register
}