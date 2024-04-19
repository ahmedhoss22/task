import axios from "axios";
import { notifyError } from "../utilities/toastify";

const Api = axios.create({
  baseURL: "http://16.170.247.231:3003",
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true
});

export const handleApiError = (error) => {
  console.log(error);
  try {
    if (Array.isArray(error?.response?.data)) {
      error.response.data.map((e) => notifyError(e.message));
    } else {
      const errorMes =
        error.response?.data?.error || error.response?.data?.message;
      notifyError(errorMes);
    }
    return error.response.data.error;
  } catch (error) {
    console.log(error);
  }
};

export default Api;
