import { SET_CURRENT_USER } from "./types";
import { GET_ERROR } from "./types";
import { CLEAR_CURRENT_USER } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const registeruser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERROR,
        payload: err.response.data,
      })
    );
};

export const loginuser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      //get the token value using destructring
      const { token } = res.data;
      //save to localstorage
      localStorage.setItem("jwtToken", token);
      //set the auth header
      setAuthToken(token);
      //decode token
      const decoded = jwt_decode(token);
      //setCurrentUser(dispatch(decoded));
      dispatch(setCurrentUser(decoded));

      history.push("/profile");
    })
    .catch((err) => {
      console.log("🚀 ~ file: authAction.js ~ line 36 ~ loginuser ~ err", err);
      if (err.response) {
        dispatch({
          type: GET_ERROR,
          payload: err.response.data,
        });
      }
    });
};
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};
//log user out

// Log user out
export const logoutuser = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
// Clear profile
export const clearCurrentUser = () => {
  return {
    type: CLEAR_CURRENT_USER,
  };
};
