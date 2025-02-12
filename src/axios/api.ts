import axios from "axios";
import { config } from "../configs/config";

const api = axios.create({
  baseURL: config.API_URL,
});

export { api };
