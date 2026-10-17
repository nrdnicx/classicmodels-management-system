const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { text: "World" });
});

app.use("/users", require("./routes/users"));
app.use("/customers", require("./routes/customers"));
app.use("/employees", require("./routes/employees"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/sales", require("./routes/sales"));

app.listen(3000, (req, res) => {
  console.log(`Listening to port: ${3000}`);
});
