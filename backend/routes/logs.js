const express = require("express");
const authMiddleware = require("../middleware/auth");
const Log = require("../models/Log");
const Habit = require("../models/Habit");

const router = express.Router();

// Create a log (mark a habit as completed)
router.post("/", authMiddleware, async (req, res) => {
  const { habitId, date } = req.body;

  try {
    const habit = await Habit.findOne({ _id: habitId, userId: req.user });
    if (!habit) return res.status(404).json({ message: "Habit not found" });

    const log = new Log({ habitId, date });
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ message: "Error creating log" });
  }
});

// Get logs for a habit
router.get("/:habitId", authMiddleware, async (req, res) => {
  const { habitId } = req.params;

  try {
    const habit = await Habit.findOne({ _id: habitId, userId: req.user });
    if (!habit) return res.status(404).json({ message: "Habit not found" });

    const logs = await Log.find({ habitId }).sort({ date: 1 });
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching logs" });
  }
});

// Delete a log (undo a habit completion)
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const log = await Log.findByIdAndDelete(id);
    if (!log) return res.status(404).json({ message: "Log not found" });

    res.status(200).json({ message: "Log deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting log" });
  }
});

module.exports = router;
