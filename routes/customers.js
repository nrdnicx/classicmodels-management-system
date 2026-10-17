const express = require("express");
const route = express.Router();

const pool = require("../config/config");

route.get("/", async (req, res) => {
  await pool.query(
    "SELECT * FROM customers ORDER BY customerNumber DESC LIMIT 5",
    (error, results) => {
      if (error) {
        res.status(500).send("Error retrieving users");
      } else {
        res.render("customer-list", { user_list: results });
      }
    }
  );
});

route.get("/add-new", async (req, res) => {
  res.render("add-new");
});

route.post("/add", async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phone = req.body.phone;
  const address = req.body.address;

  await pool.query(
    "INSERT INTO customers(contactFirstName, contactLastName, phone, addressLine1) VALUES(?, ?, ?, ?)",
    [firstName, lastName, phone, address],
    (error, results) => {
      if (error) {
        res.status(500).send("Error Adding users");
      } else {
        console.log("User Added");
        console.log(results);
        res.redirect("/customers");
      }
    }
  );
});

route.get("/update/:id", async (req, res) => {
  await pool.query(
    "SELECT * FROM customers WHERE customerNumber = ?",
    [req.params.id],
    (error, results) => {
      if (error) {
        res.status(500).send("Error retrieving user");
      } else {
        res.render("update", { user: results });
      }
    }
  );
});

route.put("/:id", async (req, res) => {
  const id = req.params.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phone = req.body.phone;
  const address = req.body.address;

  await pool.query(
    "UPDATE customers SET contactFirstName = ?, contactLastName = ?, phone = ?, addressLine1 = ? WHERE customerNumber = ?",
    [firstName, lastName, phone, address, id],
    (error, results) => {
      if (error) {
        res.status(500).send("Error Updating user");
      } else {
        console.log("User Updated");
        console.log(results);
        res.redirect("/customers");
      }
    }
  );
});

route.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await pool.query(
    "DELETE FROM customers WHERE customerNumber = ?",
    [id],
    (error, results) => {
      if (error) {
        res.status(500).send("Error Deleting user");
      } else {
        console.log("User Deleted");
        console.log(results);
        res.redirect("/customers");
      }
    }
  );
});

module.exports = route;
