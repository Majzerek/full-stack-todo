import axios from "axios";
import { getToken } from "@/services/authServices";


axios.defaults.headers.common.Authorization = getToken();

export default axios;