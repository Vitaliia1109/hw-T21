const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));

// Read person.json and display "Welcome" message
app.get("/", (req, res) => {
  fs.readFile("person.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading person.json");
    }
    const person = JSON.parse(data);
    res.send(`Welcome, ${person.name}`);
  });
});

// Error handling for unknown paths
app.get("*", (req, res) => {
  res
    .status(404)
    .send("Sorry! Can't find that resource. Please check your URL");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
