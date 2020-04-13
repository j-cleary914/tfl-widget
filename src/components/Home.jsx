import React from "react";
import { Link } from "@reach/router";

const Home = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <p>
        Click the button below to naviage to /travel and load the travel widget!
      </p>
      <Link to="/travel">
        <p> Click me !</p>
      </Link>
    </div>
  );
};

export default Home;
