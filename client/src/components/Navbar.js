import React, { Component } from "react";

export default class Navbar extends Component {
  render() {
    return (
      <nav id="sidebar">
        <div className="sidebar-header">
          <h3>Jobs for skills</h3>
        </div>
        <ul className="list-unstyled components">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
        </ul>
      </nav>
    );
  }
}
