const express = require("express");
const authMiddleware = require("../middleware/auth");
const Habit = require("../models/Habit");
const Log = require("../models/Log");

const router = express.Router();

// Create a new habit
router.post("/", authMiddleware, async (req, res) => {
  const { title, description, frequency } = req.body;

  try {
    const habit = new Habit({
      userId: req.user,
      title,
      description,
      frequency,
    });
    await habit.save();
    res.status(201).json(habit);
  } catch (err) {
    res.status(500).json({ message: "Error creating habit" });
  }
});

// Get all habits for the logged-in user (with calendar data)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user });

    // Handle case where no habits exist
    if (!habits.length) {
      return res.status(404).json({ message: "No habits found" });
    }

    const habitData = await Promise.all(
      habits.map(async (habit) => {
        try {
          // Fetch logs for each habit
          const logs = await Log.find({ habitId: habit._id }).sort({ date: 1 });

          // Calculate stats and extract completed dates
          const stats = logs.length
            ? calculateHabitStats(logs)
            : { streak: 0, totalCompletionRate: 0, totalDays: 0 };
          const completedDates = logs.map((log) => log.date); // Extract completed dates

          return { ...habit.toObject(), stats, completedDates }; // Include completed dates
        } catch (err) {
          console.error(`Error processing habit ${habit._id}:`, err);
          return { ...habit.toObject(), stats: {}, completedDates: [] };
        }
      })
    );

    res.status(200).json(habitData);
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ message: "Error fetching habits" });
  }
});

// Update a habit
router.patch("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, description, frequency } = req.body;

  try {
    const habit = await Habit.findOneAndUpdate(
      { _id: id, userId: req.user },
      { title, description, frequency },
      { new: true }
    );
    if (!habit) return res.status(404).json({ message: "Habit not found" });
    res.status(200).json(habit);
  } catch (err) {
    res.status(500).json({ message: "Error updating habit" });
  }
});

// Delete a habit
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const habit = await Habit.findOneAndDelete({ _id: id, userId: req.user });
    if (!habit) return res.status(404).json({ message: "Habit not found" });
    res.status(200).json({ message: "Habit deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting habit" });
  }
});

// Get streak and completion stats for a habit
router.get("/:id/stats", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    // Validate that the habit belongs to the user
    const habit = await Habit.findOne({ _id: id, userId: req.user });
    if (!habit) return res.status(404).json({ message: "Habit not found" });

    // Fetch logs for this habit, sorted by date
    const logs = await Log.find({ habitId: id }).sort({ date: 1 });

    // Calculate streak and completion stats
    const stats = calculateHabitStats(logs);
    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json({ message: "Error fetching habit stats" });
  }
});

// Mark a habit as completed
router.put("/:id/mark-complete", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    // Validate that the habit exists and belongs to the user
    const habit = await Habit.findOne({ _id: id, userId: req.user });
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    // Create a log for the completion
    const today = new Date().setHours(0, 0, 0, 0); // Today's date at midnight
    const existingLog = await Log.findOne({ habitId: id, date: today });

    if (existingLog) {
      return res
        .status(400)
        .json({ message: "Habit already completed for today" });
    }

    const log = new Log({
      habitId: id,
      date: today,
    });

    await log.save();

    res.status(200).json({ message: "Habit marked as completed", log });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error marking habit as completed" });
  }
});

// Function to calculate streaks and completion
const calculateHabitStats = (logs) => {
  // Ensure logs are sorted by date
  logs.sort((a, b) => new Date(a.date) - new Date(b.date));

  let streak = 0;
  let today = new Date().setHours(0, 0, 0, 0); // Ensure we're comparing dates at midnight
  let previousDate = today;

  // Start calculating streak from the most recent log backward
  for (let i = logs.length - 1; i >= 0; i--) {
    const logDate = new Date(logs[i].date).setHours(0, 0, 0, 0);

    // Check if logDate matches the previousDate (streak continuity)
    if (logDate === previousDate) {
      streak++;
      previousDate -= 24 * 60 * 60 * 1000; // Move to the previous day
    } else if (logDate < previousDate) {
      break; // Break streak if there's a gap
    }
  }

  // Calculate completion rate (e.g., weekly or monthly)
  const totalDays = logs.length;
  const totalCompletionRate = ((totalDays / 7) * 100).toFixed(2);

  return { streak, totalCompletionRate, totalDays };
};

module.exports = router;
