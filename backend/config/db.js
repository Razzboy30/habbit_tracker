const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.MONGO_URI;
if (!uri) {
  console.error(
    "MongoDB URI is undefined. Please check your environment variables."
  );
  process.exit(1); // Exit the application if the URI is not defined
}

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};
connectDB();
module.exports = connectDB;
