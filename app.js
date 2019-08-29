const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

//Routes
const userRoutes = require("./routes/users/index");

mongoose
  .connect(process.env.MONGO_CONNECTION_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("Mongo Connection Established");
  })
  .catch(err => console.log(err));

app.use(cors());
app.use(helmet());
app.use(morgan(null));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/user", userRoutes);

app.listen(5555, err => {
  if (err) throw err;
  console.log("Server Started Succesfully at 5555");
});
