import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const HabitList = ({ habits, onUpdate }) => {
  const tileClassName = ({ date, view }, completedDates) => {
    if (view === "month") {
      const isCompleted = completedDates.some(
        (d) => new Date(d).toDateString() === date.toDateString()
      );
      if (isCompleted) {
        return "bg-green-500 text-white rounded-full"; // Highlight completed dates
      }
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {habits.map((habit) => (
        <div
          key={habit.id || habit._id}
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
        >
          <h2 className="text-xl font-bold text-primary">{habit.title}</h2>
          <p className="text-gray-600 mt-2">{habit.description}</p>
          <div className="mt-4">
            <p className="text-sm text-gray-700">
              <strong>Streak:</strong> {habit.stats?.streak || 0}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Completed:</strong> {habit.stats?.completed || 0}
            </p>
          </div>
          <div className="mt-4">
            <Calendar
              tileClassName={({ date, view }) =>
                tileClassName({ date, view }, habit.completedDates || [])
              }
              className="mt-4 border-none shadow-lg rounded-lg"
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
              onClick={() => onUpdate(habit.id || habit._id, "markCompleted")}
            >
              Mark As Completed
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
              onClick={() => onUpdate(habit.id || habit._id, "delete")}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HabitList;
