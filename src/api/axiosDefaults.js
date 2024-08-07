// Code partly from Code Institutes walkthrough project and study material
import axios from "axios";

axios.defaults.baseURL = "https://memobook-drfapi-88acd1672bdf.herokuapp.com/";
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();