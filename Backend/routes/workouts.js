const express = require("express");

const {
  createworkout,
  getallworkout,
  getsingleworkout,
  deleteworkout,
  updateworkout,
} = require("../controllers/workoutcontrollers");

const router = express.Router();

// Get All Workouts
router.get("/", getallworkout);

// Get single workout
router.get("/:id", getsingleworkout);

// post a new workout
// no id cause when post request gets fired it will act
router.post("/", createworkout);

// delete a workout
router.delete("/:id", deleteworkout);

// update a workout
router.patch("/:id", updateworkout);
//

module.exports = router;
