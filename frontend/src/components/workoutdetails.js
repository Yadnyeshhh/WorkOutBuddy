import React, { useContext } from "react";
import { WorkoutContext } from "../Context/context";
const Workoutdetails = ({ workout }) => {
  const value = useContext(WorkoutContext);
  const handleOnClick = async () => {
    const User = JSON.parse(localStorage.getItem("user"));
    if (!User) {
      return;
    }
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${User.token}`,
      },
    });
    if (response.ok) {
      value.setworkouts((prevWorkouts) =>
        prevWorkouts.filter((w) => w._id !== workout._id)
      );
    }
  };

  return (
    <>
      <div className="workoutdetails">
        <h4>{workout.title}</h4>
        <p>
          <strong>Load (kg) :</strong> {workout.load}
        </p>
        <p>
          <strong>Reps:</strong> {workout.reps}
        </p>
        <p>{new Date(workout.createdAt).toLocaleString()}</p>

        <span className="delete" onClick={handleOnClick}>
          delete
        </span>
      </div>
    </>
  );
};

export default Workoutdetails;
