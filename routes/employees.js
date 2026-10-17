const express = require("express");
const conn = require("../config/config");
const router = express.Router();

router.get("/", function (req, res) {
  res.send("Employees Page");
});

router.get("/list", async function (req, res) {
  await conn.query(
    "SELECT employeeNumber, firstName, lastName, jobTitle, email FROM employees ORDER BY employeeNumber DESC LIMIT 5",
    function (error, results) {
      if (error) {
        res.send("Error retrieving employees");
      } else {
        console.log(results);
        res.render("employees-list", { data: results });
      }
    }
  );
});

router.get("/add-new", function (req, res) {
  res.render("employee-add");
});

router.post("/add", function (req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const jobTitle = req.body.jobTitle;
  const email = req.body.email;

  conn.query(
    "INSERT INTO employees(lastName, firstName, email, jobTitle) VALUES(?, ?, ?, ?)",
    [lastName, firstName, email, jobTitle],
    function (error, result) {
      if (error) {
        res.send(`Error adding user: ${error}`);
      } else {
        console.log(result);
        res.redirect("/employees/list");
      }
    }
  );
});

router.get("/:employeeNumber", async function (req, res) {
  await conn.query(
    "SELECT * FROM employees WHERE employeeNumber = ?",
    [req.params.employeeNumber],
    function (error, result) {
      if (error) {
        res.send(error);
      } else {
        console.log(result);
        res.render("employee-edit", { data: result });
      }
    }
  );
});

router.put("/:employeeNumber", async function (req, res) {
  const employeeNumber = req.params.employeeNumber;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const jobTitle = req.body.jobTitle;
  const email = req.body.email;

  await conn.query(
    "UPDATE employees SET lastName = ?, firstName = ?, email = ?, jobTitle = ? WHERE employeeNumber = ?",
    [lastName, firstName, email, jobTitle, employeeNumber],
    function (error, result) {
      if (error) {
        res.send(error);
      } else {
        res.redirect("/employees/list");
      }
    }
  );
});

router.delete("/:employeeNumber", function (req, res) {
  conn.query(
    "DELETE FROM employees WHERE employeeNumber = ?",
    [req.params.employeeNumber],
    function (error, result) {
      if (error) {
        res.send(error);
      } else {
        res.redirect("/employees/list");
      }
    }
  );
});

module.exports = router;
