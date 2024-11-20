import React, { useState, useEffect } from "react";
import AddHabitForm from "../Habit/AddHabitForm";
import HabitList from "../Habit/HabitList";
import api from "../../services/api";

const Dashboard = () => {
  const [habits, setHabits] = useState([]);

  const fetchHabits = async () => {
    try {
      const response = await api.get("/habits");
      setHabits(response.data);
    } catch (err) {
      console.error(err.response?.data?.message || "Error fetching habits");
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleUpdateHabit = async (habitId, action) => {
    try {
      if (action === "markCompleted") {
        const response = await api.put(`/habits/${habitId}/mark-complete`);
        console.log("Habit marked as completed:", response.data);
      } else if (action === "delete") {
        await api.delete(`/habits/${habitId}`);
        console.log("Habit deleted");
      }
      fetchHabits(); // Refresh habits after action
    } catch (err) {
      console.error(err.response?.data?.message || "Error updating habit");
    }
  };

  return (
    <div className="min-h-screen bg-primary-light p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">
          Habit Tracker Dashboard
        </h1>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Sign Out
        </button>
      </header>
      <AddHabitForm onHabitAdded={fetchHabits} />
      <HabitList habits={habits} onUpdate={handleUpdateHabit} />
    </div>
  );
};

export default Dashboard;
