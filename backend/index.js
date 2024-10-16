const connectToDb = require("./db");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors);

app.use(express.json());

//api routes here

app.get("/", (req, res) => {
  res.send("Hello Dosto welcome to library mgmt.");
});

app.listen(port, () => {
  console.log(`library management backend listening on port ${port}`);
});
connectToDb();
