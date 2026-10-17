const express = require("express");
const route = express.Router();

route.get("/", (req, res) => {
  res.send("Users Page");
});

route.get("/add", (req, res) => {
  res.send("Add User");
});

route.get("/:id", (req, res) => {
  res.send(`User id ${req.params.id}`);
});

module.exports = route;
