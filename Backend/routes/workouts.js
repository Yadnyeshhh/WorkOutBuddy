const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
  createworkout,
  getallworkout,
  getsingleworkout,
  deleteworkout,
  updateworkout,
} = require("../controllers/workoutcontrollers");

const router = express.Router();

// requre auth for all workouts
router.use(requireAuth);

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
