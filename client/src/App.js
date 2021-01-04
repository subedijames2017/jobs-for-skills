import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Landingpage from "./components/Landingpage";
import About from "./components/About";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Skills from "./components/Profile/Skills";
import Profile from "./components/Profile/Profile";
import Jobs from "./components/Profile/Jobs";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./components/common/PrivateRoute";

import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authAction";
import jwt_decode from "jwt-decode";
import { logoutuser } from "./actions/authAction";

if (localStorage.jwtToken) {
  //set auth header
  setAuthToken(localStorage.jwtToken);
  //decode the token
  const decoded = jwt_decode(localStorage.jwtToken);
  //dispatch the user
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutuser());

    // store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="App wrapper">
          <Route exact path="/" component={Landingpage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/about" component={About} />
          <Route exact path="/login" component={Login} />
          <Switch>
            <PrivateRoute exact path="/profile" component={Profile} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/skills" component={Skills} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/jobs" component={Jobs} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
