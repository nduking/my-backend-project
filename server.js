// installed// Import the packages we installed
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//Enable usage of .env files -This must always be at the top-mst part of your server/app/index .js file
require("dotenv").config();

//Import routes
const authRoutes = require("./routes/auth");

// application// Create our Express application
const app = express();

// request)// Set up middleware (code that runs for every request)
app.use(cors()); //Allow requests from other websites
app.use(express.json()); //understand JSON data in requests

//Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error;", err));

// Define the port our server will listen on
const PORT = process.env.PORT || 5000;

// Create a simple route (URL endpoint)
app.get("/", (req, res) => {
  res.json({ message: "Hello! Your backend server is running!" });
});

//Create a simple route (URL endpoint)
app.get("/", (req, res) => {
  res.json({
    status:ok,
    message: "Welcome to your MERN Backend API!",
    endpoints: {
      register: "POST/api/auth/register",
      login: "POST/api/auth/login",
      profile: "GET/api/auth/profile(requires token",
    },
  });
});

//Use authentication routes
app.use('/api/auth',authRoutes);

//Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  console.log(`http://localhost:${PORT}`);
});
