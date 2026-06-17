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

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [authSuccessCallback, setAuthSuccessCallback] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState("login");

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
      );

      if (refreshRes.data.success) {
        const token = refreshRes.data.accessToken;
        setToken(token);
        // Set the new access token in common headers
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Fetch user data
        const userRes = await axios.get(
          `${config.api.baseUrl}${config.api.endpoints.auth.me}`,
        );
        if (userRes.data.success) {
          setUser(userRes.data.user);
        }
      }
    } catch (error) {
      // If refresh fails, user is not logged in or session expired
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${config.api.baseUrl}${config.api.endpoints.auth.login}`,
        { email, password },
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
