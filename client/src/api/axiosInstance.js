import axios from "axios";

const server = axios.create({
  baseURL: "http://localhost:8800/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
});

export default server;