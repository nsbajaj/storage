// Setup
const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

// Data model and persistent store
const manager = require("./manager.js");

const m = manager("mongodb://nsbajaj:nsbajaj@senecaweb-shard-00-00-ryf1t.mongodb.net:27017,senecaweb-shard-00-01-ryf1t.mongodb.net:27017,senecaweb-shard-00-02-ryf1t.mongodb.net:27017/bti425_assign2?ssl=true&replicaSet=SenecaWeb-shard-0&authSource=admin&retryWrites=true");

// Add support for incoming JSON entities
app.use(bodyParser.json());

// Add support for CORS
app.use(cors());

// Deliver the app's home page to browser clients
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "/index.html"));
});

// Get all
app.get("/api/items", (req, res) => {
    res.json({message: "fetch all items"});
});

// Get one
app.get("/api/items/:itemId", (req, res) => {
    res.json({message: "get user with Id: " + req.params.itemId});
});

// Add new
app.post("/api/items", (req, res) => {
     res.json({message: "add a user item: " + req.body.firstName + " " + req.body.lastName});
});

// Edit existing
app.put("/api/items/:itemId", (req, res) => {
    res.json({message: "update user with Id: " + req.params.itemId + " to " + req.body.firstName + " " + req.body.lastName});
});

// Delete item
app.delete("/api/items/:itemId", (req, res) => {
     res.json({message: "delete user with Id: " + req.params.itemId});
});

// Resource not found (this should be at the end)
app.use((req, res) => {
  res.status(404).send("Resource not found");
});

// Tell the app to start listening for requests
app.listen(HTTP_PORT, () => {
    console.log("Ready to handle requests on port " + HTTP_PORT);
});