import { api } from "./axios";

let onLogout: (() => void) | null = null;

export const setupInterceptors = (logoutCallback: () => void) => {
  onLogout = logoutCallback ?? null;

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status;

      if (status === 401) {
        localStorage.clear();

        if (onLogout) onLogout();
      }

      return Promise.reject(error);
    }
  );
};
