const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(express.json())
app.use("/upload",express.static('uploads'))

connectDB();
app.use('/api', userRoutes);
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
