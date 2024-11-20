import React, { useState } from "react";
import api from "../../services/api";

const AddHabitForm = ({ onHabitAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState([]);
  const [loading, setLoading] = useState(false);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleCheckboxChange = (day) => {
    setFrequency((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/habits", { title, description, frequency });
      onHabitAdded(); // Trigger parent to refresh habits
      setTitle("");
      setDescription("");
      setFrequency([]);
    } catch (err) {
      console.error(
        "Error adding habit:",
        err.response?.data?.message || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg mb-6"
    >
      <h2 className="text-xl font-bold text-primary mb-4">Add New Habit</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-2 w-full"
          placeholder="Enter habit title"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-2 w-full"
          placeholder="Enter habit description"
        />
      </div>
      <div className="mb-4">
        <p className="text-gray-700 font-bold mb-2">Frequency (Select Days):</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {daysOfWeek.map((day) => (
            <label key={day} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={frequency.includes(day)}
                onChange={() => handleCheckboxChange(day)}
                className="form-checkbox text-primary"
              />
              <span>{day}</span>
            </label>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded w-full"
      >
        Add Habit
      </button>
    </form>
  );
};

export default AddHabitForm;
