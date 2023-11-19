// server.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import CORS middleware
const db = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// Connect to MongoDB
mongoose
  .connect(db.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
const userRoutes = require("./routes/userRoutes.js");
const teamRoutes = require("./routes/teamRoutes.js");
const team = require("./routes/team.js");

app.use("/api/users", userRoutes);
// app.use("/api/team", teamRoutes);
app.use("/api/team", team);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
