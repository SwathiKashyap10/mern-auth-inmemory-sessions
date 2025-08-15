import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080", // change when deploying
  withCredentials: true, // if using cookies/session auth
});

export default API;


// 1) You won’t repeat "http://localhost:5000/api" everywhere.
// 2) You can set interceptors later for authentication tokens.

