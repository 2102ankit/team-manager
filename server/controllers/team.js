const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3001;
const MONGODB_URI = "YOUR_MONGODB_URI"; // Replace with your MongoDB Atlas URI

app.use(bodyParser.json());

const client = new MongoClient(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let teamsCollection;

// Connect to MongoDB Atlas
client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    const db = client.db("your_database_name"); // Replace with your database name
    teamsCollection = db.collection("teams");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
    process.exit(1);
  });

// Endpoint to create a new team
app.post("/api/team");

// Endpoint to retrieve team details by ID
app.get("/api/team/:id");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
