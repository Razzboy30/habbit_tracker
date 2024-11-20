import axios from "axios";
import "../tailwind.css";

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

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add interceptor to include Authorization header and check token expiry
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = parseJwt(token);

    // Check if the token is expired
    const now = Date.now() / 1000; // Current time in seconds
    if (decodedToken?.exp < now) {
      localStorage.removeItem("token"); // Clear expired token
      window.location.href = "/"; // Redirect to Home Page
      return Promise.reject(new Error("Session expired. Please log in again."));
    }

    // Add Authorization header if token is valid
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
