import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/Authcontext";

const Login = () => {
  const state = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email, password);
    setIsLoading(true);
    setError(null);
    const info = { email, password };
    // console.log("Sending data:", JSON.stringify(info));

    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });

    try {
      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
        console.log(error);
      }
      if (response.ok) {
        // save user to local storage that is token so after he close and open browser his info is stored
        localStorage.setItem("user", JSON.stringify(json));
        // update authcontext
        state.setLogState("loggedin");
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form action="" className="signup" onSubmit={handleSubmit}>
      <h3>Login</h3>

      <label htmlFor="">email</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label htmlFor="">password</label>
      <input
        type="text"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button disabled={isLoading}>Login</button>
    </form>
  );
};
// export { email, password };
export default Login;
