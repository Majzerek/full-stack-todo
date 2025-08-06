import { getToken } from "@/services/authServices";
import axios from "axios";

axios.defaults.headers.common.Authorization = getToken();

export default axios;