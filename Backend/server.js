const express = require("express");
require("dotenv").config();
const workoutRoutes = require("./routes/workouts.js");
const mongoose = require("mongoose");

//express app
const app = express();

// console.log("hello");

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path);
  next();
});

//routes
app.use("/api/workouts", workoutRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for request
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening on port 4000!!");
    });
  })
  .catch((error) => {
    console.log(error);
  });

// /now i get its
// app.get("/", (req, res) => {
//   res.json({ mssg: "hello" });
// });

// process.env;
