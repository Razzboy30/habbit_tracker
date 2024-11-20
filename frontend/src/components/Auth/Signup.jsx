import React, { useState, useEffect } from "react"; // Import useEffect
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import api from "../../services/api";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigate for navigation

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard", { replace: true }); // Redirect to Dashboard if already logged in
    }
  }, [navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { username, email, password });
      window.location.href = "/login"; // Redirect to Login after successful signup
    } catch (err) {
      console.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <form
      onSubmit={handleSignup}
      className="flex flex-col items-center justify-center min-h-screen bg-primary-light"
    >
      <h1 className="text-3xl font-bold text-primary mb-6">Signup</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="border border-gray-300 rounded-lg p-2 mb-4 w-64"
      />
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
        Signup
      </button>
    </form>
  );
};

export default Signup;
