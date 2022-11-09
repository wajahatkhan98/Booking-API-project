import { API, Headers } from "../config/api";

const getUserDatils = () =>
  API.get("/api/users/mydetails",{headers:Headers()}).then(
    (res) => res,
    (err) => err
  );
export const userService = {
  getUserDatils
};
