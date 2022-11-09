import axios from "axios";

export const API = axios.create({
  // baseURL: "http://localhost:8800/",
  baseURL:"https://jumaline.herokuapp.com/"
});
export const Headers = (token) => {
  // const token = JSON.parse(localStorage.getItem("token"));
  // 
  if (token) {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      token,
    };
  }
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};
API.defaults.headers['X-RapidAPI-Key']='86860d3d81msh8abd87a28d32371p1f6c62jsne87a6c8d6db1';
API.defaults.headers['X-RapidAPI-Host']='86860d3d81msh8abd87a28d32371p1f6c62jsne87a6c8d6db1';
API.defaults.headers.post["Content-Type"] = "application/json";
API.defaults.headers.post.token = localStorage.getItem("token");
API.defaults.headers.get.token = localStorage.getItem("token");
API.defaults.headers.delete.token = localStorage.getItem("token");
API.defaults.headers.get.Authorization = `Bearer ${localStorage.getItem(
  "token"
)}`;
API.defaults.headers.post.Authorization = `Bearer ${localStorage.getItem(
  "token"
)}`;
API.defaults.headers.put.Authorization = `Bearer ${localStorage.getItem(
  "token"
)}`;
API.defaults.headers.delete.Authorization = `Bearer ${localStorage.getItem(
  "token"
)}`;

API.interceptors.request.use(
  (req) => req,
  (error) => Promise.reject(error)
);
