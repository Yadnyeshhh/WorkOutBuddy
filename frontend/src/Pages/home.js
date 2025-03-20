import React, { useEffect, useContext } from "react";
import Workoutdetails from "../components/workoutdetails";
import WorkoutForm from "../components/WorkoutForm";
import { WorkoutContext } from "../Context/context";
import { AuthContext } from "../Context/Authcontext";

const Home = () => {
  const { logState } = useContext(AuthContext);
  const data = useContext(WorkoutContext);
  // const [workouts, setworkouts] = useState([]);

  useEffect(() => {
    const User = JSON.parse(localStorage.getItem("user"));
    const fetchWorkout = async () => {
      const response = await fetch("/api/workouts", {
        headers: {
          Authorization: `Bearer ${User.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        data.setworkouts(json);
      }
    };
    if (logState === "loggedin") {
      fetchWorkout();
    }
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {data.workouts &&
          data.workouts.map((workout) => (
            <Workoutdetails key={workout._id} workout={workout} />
          ))}
      </div>
      <div className="workoutform">
        <WorkoutForm />
      </div>
    </div>
  );
};

export default Home;
