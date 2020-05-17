import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Tab, Tabs, Row, Nav, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Landingpage from "./components/Landingpage";
import About from "./components/About";

function App() {
  return (
    <div className="App wrapper">
      <Navbar />
      <Landingpage />
    </div>
  );
}

export default App;
