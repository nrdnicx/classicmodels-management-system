const express = require("express");
const router = express.Router();

const conn = require("../config/config");

router.get("/", async function (req, res) {
  await conn.query(
    `SELECT MONTH(paymentDate) AS month, YEAR(paymentDate) AS year, SUM(amount) AS total_sales FROM payments WHERE YEAR(paymentDate) = '2002' GROUP BY MONTH(paymentDate) ORDER BY MONTH(paymentDate);`,
    function (error, results) {
      if (!error) {
        res.render("sales", { data: results });
      }
    }
  );
});

router.post("/", async function (req, res) {
  await conn.query(
    `SELECT MONTH(paymentDate) AS month, YEAR(paymentDate) AS year, SUM(amount) AS total_sales FROM payments WHERE YEAR(paymentDate) = ? GROUP BY MONTH(paymentDate) ORDER BY MONTH(paymentDate);`,
    [req.body.year],
    function (error, results) {
      res.json(
        error
          ? { success: false, message: error }
          : { success: true, data: results }
      );
    }
  );
});

module.exports = router;
