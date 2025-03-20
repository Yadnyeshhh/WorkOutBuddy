// import logo from "./logo.svg";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Home from "./Pages/home";
import Login from "./Pages/login";
import Signup from "./Pages/signup";
import Navbar from "./components/Navbar";
import { AuthContext } from "./Context/Authcontext";
import { WorkoutContext } from "./Context/context";

function App() {
  const [logState, setLogState] = useState(null);
  const [workouts, setworkouts] = useState([]);
  useEffect(() => {
    const user = localStorage.getItem("user");
    setLogState(user ? "loggedin" : "loggedout");
  }, []);

  useEffect(() => {
    // Change body background based on login state
    if (logState === "loggedin") {
      document.body.classList.add("logged-in");
      document.body.classList.remove("logged-out");
    } else {
      document.body.classList.add("logged-out");
      document.body.classList.remove("logged-in");
    }
  }, [logState]);

  const showNavbar = () => logState !== "loggedout"; // returns true if logged in, false if logged out

  // console.log(showNavbar());

  return (
    <>
      <AuthContext.Provider value={{ logState, setLogState }}>
        <WorkoutContext.Provider value={{ workouts, setworkouts }}>
          <BrowserRouter>
            {showNavbar() && <Navbar />}
            <div className="pages">
              <Routes>
                <Route
                  path="/"
                  element={
                    logState === "loggedin" ? (
                      <Home />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                ></Route>
                <Route
                  path="/login"
                  element={
                    logState === "loggedout" ? <Login /> : <Navigate to="/" />
                  }
                ></Route>
                <Route
                  path="/signup"
                  element={
                    logState === "loggedout" ? <Signup /> : <Navigate to="/" />
                  }
                ></Route>
              </Routes>
            </div>
          </BrowserRouter>
        </WorkoutContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
