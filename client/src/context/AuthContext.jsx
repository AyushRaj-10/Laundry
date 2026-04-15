// src/contexts/AuthContext.jsx
import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();
const url = import.meta.env.VITE_BACKEND_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auto‑login from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    setError(null);
    try {
      const res = await axios.post(`${url}/api/v1/auth/register`, userData);
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      return false;
    }
  };

  const login = async (userData) => {
    setError(null);
    try {
      const res = await axios.post(`${url}/api/v1/auth/login`, userData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      return false;
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, error, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;