import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import api from "../../services/api";

const HabitStats = ({ stats, habitId }) => {
  const [completedDates, setCompletedDates] = useState([]);
  const [weeklyStats, setWeeklyStats] = useState(0);
  const [monthlyStats, setMonthlyStats] = useState(0);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await api.get(`/logs/${habitId}`);
        const dates = response.data.map((log) => new Date(log.date));
        setCompletedDates(dates);

        // Calculate stats
        const stats = calculateWeeklyMonthlyStats(response.data);
        setWeeklyStats(stats.weeklyCount);
        setMonthlyStats(stats.monthlyCount);
      } catch (err) {
        console.error(
          "Error fetching logs:",
          err.response?.data?.message || err.message
        );
      }
    };

    fetchLogs();
  }, [habitId]);

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const isCompleted = completedDates.some(
        (d) => d.toDateString() === date.toDateString()
      );

      // Check if the date is part of a streak
      const isStreak = completedDates.some((d, i, arr) => {
        const prevDate = new Date(d);
        prevDate.setDate(prevDate.getDate() - 1); // Previous day
        return (
          isCompleted &&
          arr.some(
            (innerDate) => innerDate.toDateString() === prevDate.toDateString()
          )
        );
      });

      if (isStreak) return "streak"; // Highlight streak dates
      if (isCompleted) return "highlight"; // Highlight completed dates
    }
    return null;
  };

  const calculateWeeklyMonthlyStats = (logs) => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay()); // Start of the week (Sunday)

    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1); // Start of the month

    let weeklyCount = 0;
    let monthlyCount = 0;

    logs.forEach((log) => {
      const logDate = new Date(log.date);
      if (logDate >= weekStart && logDate <= today) weeklyCount++;
      if (logDate >= monthStart && logDate <= today) monthlyCount++;
    });

    return { weeklyCount, monthlyCount };
  };

  return (
    <div className="bg-primary-light p-6 rounded-lg shadow-lg">
      {stats && (
        <>
          <p className="text-lg font-bold text-primary">
            <strong>Streak:</strong> {stats.streak}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Completion Rate:</strong> {stats.totalCompletionRate}%
          </p>
          <p className="text-lg text-gray-700">
            <strong>Total Days Logged:</strong> {stats.totalDays}
          </p>
        </>
      )}
      <h3 className="text-xl font-bold text-primary mt-6">Progress Calendar</h3>
      <Calendar className="mt-4 shadow-lg rounded-lg" />
    </div>
  );
};

export default HabitStats;
