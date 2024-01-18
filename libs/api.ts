import axios from "axios";

const api = axios.create({
  //baseURL: ""
  //timeout: 20000, //set timeout for api requests
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
