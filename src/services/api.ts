import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// (Opcional) usar no login/logout
export function setAuthToken(token: string) {
  localStorage.setItem("token", token);
}

export function clearAuthToken() {
  localStorage.removeItem("token");
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    // Axios v1: headers é AxiosHeaders, use set()
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      clearAuthToken();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
