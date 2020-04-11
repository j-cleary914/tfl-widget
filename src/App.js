import React from "react";
import "./App.css";
import Header from "./components/Header";
import { Router } from "@reach/router";
import Home from "./components/Home";
import Travel from "./components/Travel";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Home path="/" />
        <Travel path="/travel/*" />
      </Router>
    </div>
  );
}

export default App;
