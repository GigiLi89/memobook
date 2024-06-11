import axios from "axios";

axios.defaults.baseURL = "https://memobook-74782ac09d94.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;