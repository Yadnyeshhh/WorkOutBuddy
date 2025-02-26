import React, { useEffect, useState } from "react";
import Workoutdetails from "../components/workoutdetails";
import WorkoutForm from "../components/WorkoutForm";
import { WorkoutContext } from "../Context/context";

const Home = () => {
  const [workouts, setworkouts] = useState([]);

  useEffect(() => {
    const fetchWorkout = async () => {
      const response = await fetch("/api/workouts");
      const json = await response.json();
      if (response.ok) {
        setworkouts(json);
      }
    };

    fetchWorkout();
  }, []);

  return (
    <WorkoutContext.Provider value={{ workouts, setworkouts }}>
      <div className="home">
        <div className="workouts">
          {workouts &&
            workouts.map((workout) => (
              <Workoutdetails key={workout._id} workout={workout} />
            ))}
        </div>
        <div className="workoutform">
          <WorkoutForm />
        </div>
      </div>
    </WorkoutContext.Provider>
  );
};

export default Home;
