"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import config from "../config/config";

const getInitialUser = () => {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

const getInitialToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
};

axios.defaults.withCredentials = true;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialUser);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(getInitialToken);
  const [authSuccessCallback, setAuthSuccessCallback] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState("login");

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("accessToken", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("accessToken");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const openAuthModal = (tab = "login") => {
    setAuthTab(tab);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  // Configure axios to include credentials (cookies) for all requests
  axios.defaults.withCredentials = true;

  const checkAuth = useCallback(async () => {
    try {
      // Try to refresh the token using the refresh cookie stored in the browser
      const refreshRes = await axios.post(
        `${config.api.baseUrl}${config.api.endpoints.auth.refresh}`,
        {},
        { withCredentials: true },
      );

      if (refreshRes.data.success) {
        const token = refreshRes.data.accessToken;
        setToken(token);
        localStorage.setItem("accessToken", token);
        // Set the new access token in common headers
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Fetch user data
        const userRes = await axios.get(
          `${config.api.baseUrl}${config.api.endpoints.auth.me}`,
        );
        if (userRes.data.success) {
          setUser(userRes.data.user);
          localStorage.setItem("user", JSON.stringify(userRes.data.user));
        }
      } else {
        const storedUser = getInitialUser();
        if (storedUser) {
          setUser(storedUser);
        }
      }
    } catch (error) {
      const storedUser = getInitialUser();
      const storedToken = getInitialToken();
      if (storedUser && storedToken) {
        setUser(storedUser);
        setToken(storedToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      } else {
        setUser(null);
        setToken(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


useEffect(() => {
  const interceptor = axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        token &&
        !originalRequest.url.includes(config.api.endpoints.auth.refresh)
      ) {
        originalRequest._retry = true;

        try {
          const refreshRes = await axios.post(
            `${config.api.baseUrl}${config.api.endpoints.auth.refresh}`,
            {},
            { withCredentials: true }
          );

          const newAccessToken = refreshRes.data.accessToken;

          setToken(newAccessToken);

          axios.defaults.headers.common["Authorization"] =
            `Bearer ${newAccessToken}`;

          // originalRequest.headers["Authorization"] =
          //   `Bearer ${newAccessToken}`;

          originalRequest.headers = {
  ...originalRequest.headers,
  Authorization: `Bearer ${newAccessToken}`,
};

          return axios(originalRequest);
        } catch (err) {
          setUser(null);
          setToken(null);
          delete axios.defaults.headers.common["Authorization"];
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );

  return () => {
    axios.interceptors.response.eject(interceptor);
  };
}, [token]);


  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${config.api.baseUrl}${config.api.endpoints.auth.login}`,
        { email, password },
        { withCredentials: true },
      );
      if (res.data.success) {
        setUser(res.data.user);
        setToken(res.data.accessToken);
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${res.data.accessToken}`;
        return { success: true };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (name, email, mobileNumber, password) => {
    try {
      const res = await axios.post(
        `${config.api.baseUrl}${config.api.endpoints.auth.register}`,
        { name, email, mobileNumber, password },
        { withCredentials: true },
      );
      if (res.data.success) {
        setUser(res.data.user);
        setToken(res.data.accessToken);
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${res.data.accessToken}`;
        return { success: true };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${config.api.baseUrl}${config.api.endpoints.auth.logout}`,
        {},
        { withCredentials: true },
      );
      setUser(null);
      setToken(null);
      delete axios.defaults.headers.common["Authorization"];
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        register,
        checkAuth,
        openAuthModal,
        closeAuthModal,
        authModalOpen,
        authTab,
        authSuccessCallback,
        setAuthSuccessCallback,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
