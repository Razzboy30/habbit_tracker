import React, { useState } from "react";
import api from "../../services/api";

const HabitForm = ({ habit, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    setLoading(true);
    try {
      const today = new Date().toISOString().split("T")[0]; // Get today's date
      await api.post("/logs", { habitId: habit._id, date: today });
      onUpdate(); // Refresh the habit list
    } catch (err) {
      console.error(
        "Error completing habit:",
        err.response?.data?.message || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        `Are you sure you want to delete the habit "${habit.title}"?`
      )
    )
      return;
    setLoading(true);
    try {
      await api.delete(`/habits/${habit._id}`);
      onUpdate(); // Refresh the habit list
    } catch (err) {
      console.error(
        "Error deleting habit:",
        err.response?.data?.message || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleComplete} disabled={loading}>
        {loading ? "Completing..." : "Mark as Completed"}
      </button>
      <button onClick={handleDelete} disabled={loading}>
        {loading ? "Deleting..." : "Delete Habit"}
      </button>
    </div>
  );
};

export default HabitForm;
