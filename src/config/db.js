const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.Mongo_URI);
    console.log("MongoDB Connected ", process.env.Mongo_URI);
  } catch (error) {
    console.log("MongoDB Connection Error ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
