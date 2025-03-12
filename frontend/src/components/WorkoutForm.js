import React, { useState, useContext } from "react";
import { WorkoutContext } from "../Context/context";
const WorkoutForm = () => {
  const value = useContext(WorkoutContext);
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, seterror] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const User = JSON.parse(localStorage.getItem("user"));
    if (!User) {
      seterror("u must be logged out");
      return;
    }
    const workout = { title, load, reps };
    const response = await fetch("/api/workouts", {
      method: "POST",

      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${User.token}`,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      seterror(json.error);
      setEmptyFields(json.emptyFields || []);
      return;
    }

    if (response.ok) {
      seterror(null);
      setEmptyFields([]);
      setLoad("");
      setReps("");
      setTitle("");
      console.log("new workout added");
    }
    // console.log(json);
    value.setworkouts((prevWorkouts) => [json, ...prevWorkouts]);
  };

  return (
    <div>
      <form action="" className="createform" onSubmit={handleSubmit}>
        <h4>Add a new workout</h4>

        <label htmlFor="">Exercise Name:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={emptyFields.includes("title") ? "error" : ""}
        />

        <label htmlFor="">Load (in kgs):</label>
        <input
          type="number"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
          className={emptyFields.includes("load") ? "error" : ""}
        />

        <label htmlFor="">Reps :</label>
        <input
          type="number"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          className={emptyFields.includes("reps") ? "error" : ""}
        />
        <button>Add workout</button>
        {error && <div className="error"> {error}</div>}
      </form>
    </div>
  );
};

export default WorkoutForm;
