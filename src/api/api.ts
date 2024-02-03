import axios from "axios";

//tipagem para responses


const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;
