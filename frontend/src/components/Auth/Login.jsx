import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);

      // Clear history stack and lock user into Dashboard
      navigate("/dashboard", { replace: true });
      window.history.pushState(null, "", "/dashboard"); // Push a dummy state to block back navigation
    } catch (err) {
      console.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col items-center justify-center min-h-screen bg-primary-light"
    >
      <h1 className="text-3xl font-bold text-primary mb-6">Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border border-gray-300 rounded-lg p-2 mb-4 w-64"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border border-gray-300 rounded-lg p-2 mb-4 w-64"
      />
      <button
        type="submit"
        className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
