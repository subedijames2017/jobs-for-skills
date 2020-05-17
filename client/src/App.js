import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Landingpage from "./components/Landingpage";
import About from "./components/About";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App wrapper">
        <Navbar />
        <Route exact path="/" component={Landingpage} />
        <Route exact path="/about" component={About} />
      </div>
    </Router>
  );
}

export default App;
