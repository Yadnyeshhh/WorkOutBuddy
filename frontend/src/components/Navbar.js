import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/Authcontext";
import { WorkoutContext } from "../Context/context";

const Navbar = () => {
  const state = useContext(AuthContext);
  const data = useContext(WorkoutContext);
  const handleClick = () => {
    state.setLogState("loggedout");
    localStorage.removeItem("user");
    data.setworkouts([]);
  };
  const User = JSON.parse(localStorage.getItem("user"));
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {state.logState === "loggedin" && (
            <div className="info">
              <span className="email">{User.email}</span>
              <div className="logout">
                <button onClick={handleClick}>Logout</button>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
