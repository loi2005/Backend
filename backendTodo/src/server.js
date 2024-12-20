require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const connectDB = require("./config/db");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const route = require("./routes/index");
app.use(cors());
//morgan
app.use(morgan("combined"));
// Connect Database
connectDB();
//middleware
app.use(express.json({ extended: false }));
// Define Routes
route(app);
//run sever
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server started on port http://localhost:${PORT}`)
);
