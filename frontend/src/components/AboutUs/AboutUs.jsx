import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-primary mb-6">About HabitStats</h1>
      <p className="text-lg text-gray-700 text-center max-w-3xl">
        Welcome to HabitStats! Our mission is to help you stay consistent and
        achieve your goals by tracking your habits effectively. Whether you’re
        aiming to exercise regularly, drink more water, or read a book every
        day, HabitStats is here to help you build and sustain positive habits.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="bg-primary-light p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-primary">
            Track Your Progress
          </h2>
          <p className="text-gray-600 mt-2">
            Keep track of your daily activities and never miss a habit with our
            intuitive tracking system.
          </p>
        </div>
        <div className="bg-primary-light p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-primary">Visualize Success</h2>
          <p className="text-gray-600 mt-2">
            Get insights into your progress with streaks, completion rates, and
            interactive calendars.
          </p>
        </div>
        <div className="bg-primary-light p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-primary">Stay Motivated</h2>
          <p className="text-gray-600 mt-2">
            Unlock achievements and stay motivated as you build habits that last
            a lifetime.
          </p>
        </div>
      </div>
      <Link
        to="/signup"
        className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded mt-8"
      >
        Get Started
      </Link>
    </div>
  );
};

export default AboutUs;
