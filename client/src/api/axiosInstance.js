import axios from "axios";

const server = axios.create({
  baseURL: "http://localhost:8800/api",
});

server.interceptors.request.use(config => {
  const accessToken = sessionStorage.getItem("accessToken");

  if(accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
},(err) => Promise.reject(err));

export default server;