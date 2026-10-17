const express = require("express");
const conn = require("../config/config");
const router = express.Router();

router.get("/", async function (req, res, next) {
  await conn.query(
    `SELECT 
        MONTH(paymentDate) AS month, 
        YEAR(paymentDate) AS year,
        SUM(amount) AS total_sales
    FROM payments
    WHERE YEAR(paymentDate) = 2005
    GROUP BY MONTH(paymentDate)
    ORDER BY MONTH(paymentDate) ASC`,
    function (error, results) {
      if (error) {
        res.send("Error retrieving employees");
      } else {
        res.render("dashboard", { data: results.length ? results : '[]' });
      }
    }
  );
});

router.get("/data", async function (req, res) {
  await conn.query(  
    `SELECT 
        MONTH(paymentDate) AS month, 
        YEAR(paymentDate) AS year,
        SUM(amount) AS total_sales
    FROM payments
    WHERE YEAR(paymentDate) = 2005
    GROUP BY MONTH(paymentDate)
    ORDER BY MONTH(paymentDate)`,
    function (error, results) {
      res.json(
        error
          ? { success: false, error: "Error retrieving data" }
          : { success: true, data: results }
      );
    }
  );
});

module.exports = router;
