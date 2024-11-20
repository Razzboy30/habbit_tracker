import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Auth/Home";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import AboutUs from "./components/AboutUs/AboutUs";
import "./tailwind.css";

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((char) => {
          return "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = parseJwt(token);
      const now = Date.now() / 1000; // Current time in seconds

      if (decodedToken?.exp < now) {
        localStorage.removeItem("token"); // Clear expired token
        window.location.href = "/"; // Redirect to Home Page
      }
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
