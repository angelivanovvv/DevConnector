import Axios from "axios";
import { config } from "./api-config";

const instance = Axios.create({
  baseURL: config.baseURL,
  headers: config.headers
});

export default instance;
