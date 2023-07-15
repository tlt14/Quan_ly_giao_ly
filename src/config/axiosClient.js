import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:8000/v1/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
})

export default axiosClient