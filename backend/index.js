const connectToDb = require("./db");
const express = require("express");
const cors = require("cors");
const adminRoutes = require('./routes/admin');
const bookRoutes = require('./routes/book');
const transactionRoutes = require('./routes/transaction');
const fineRoutes = require('./routes/fine');
const authRoutes = require('./routes/auth');
const admin = require("./routes/admin");

const app = express();
const port = 5000;

connectToDb();
app.use(cors());

app.use(express.json());

//api routes here

app.get("/", (req, res) => {
  res.send("Hello Dosto welcome to library mgmt.");
});

app.use('/api', adminRoutes);
app.use('/api', bookRoutes);
app.use('/api', transactionRoutes);
app.use('/api', fineRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`library management backend listening on port ${port}`);
});
