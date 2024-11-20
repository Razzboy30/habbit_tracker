const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
  habitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Habit",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  completed: {
    type: Boolean,
    default: true, // Defaults to true since a log indicates habit completion
  },
});

module.exports = mongoose.model("Log", LogSchema);
