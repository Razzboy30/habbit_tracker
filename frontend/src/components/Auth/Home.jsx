import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-light">
      <h1 className="text-4xl font-bold text-primary mb-4">
        Welcome to Habit Tracker
      </h1>
      <p className="text-lg text-gray-700">
        Please Login or Register to start tracking your habits.
      </p>
      <div className="flex space-x-4 mt-6">
        <Link to="/login">
          <button className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="bg-secondary hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">
            Register
          </button>
        </Link>
      </div>
      <Link
        to="/about"
        className="text-primary-dark hover:text-primary font-bold mt-8 underline"
      >
        About HabitStats
      </Link>
    </div>
  );
};

export default Home;
