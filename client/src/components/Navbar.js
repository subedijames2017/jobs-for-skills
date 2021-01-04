import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutuser, clearCurrentUser } from "./../actions/authAction";
import PropTypes from "prop-types";

class Navbar extends Component {
  handelLogout = (e) => {
    e.preventDefault();
    this.props.clearCurrentUser();
    this.props.logoutuser();
    //console.log("this is working");
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <div>
        <nav className="navbar bg-blue">
          <h1>
            <a href="dashboard.html">
              <i className="fa fa-briefcase" aria-hidden="true"></i> Jobs For
              skills
            </a>
          </h1>
          <ul>
            <li className="nav-item">
              <a href="/">
                <i className="fa fa-home" aria-hidden="true"></i> Home
              </a>
            </li>
            {isAuthenticated && (
              <li className="nav-item dropdown">
                <a
                  href="/profile"
                  className="dropdown-toggle dropdown-avatar"
                  data-toggle="dropdown"
                >
                  <span>
                    <i className="fa fa-user" aria-hidden="true"></i>
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <Link to="/profile" className="dropdown-item">
                    <i className="fa fa-user" aria-hidden="true"></i> Your
                    Profile
                  </Link>
                  <Link to="/jobs" className="dropdown-item">
                    <i className="fa fa-briefcase" aria-hidden="true"></i> Your
                    Jobs
                  </Link>
                  <Link to="/skills" className="dropdown-item">
                    <i className="fa fa-key" aria-hidden="true"></i> Your Skills
                  </Link>
                  <div className="dropdown-divider" />
                  <Link
                    to="/logout"
                    className="dropdown-item"
                    onClick={this.handelLogout.bind(this)}
                  >
                    <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
                  </Link>
                </div>
              </li>
            )}
            {!isAuthenticated && (
              <li className="nav-item">
                <a href="/login">
                  <i className="fa fa-sign-out" aria-hidden="true"></i> Login
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutuser, clearCurrentUser })(
  Navbar
);
