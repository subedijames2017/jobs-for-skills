import { GET_SKILLS } from "./types";
import { GET_ERROR } from "./types";
import { CLEAR_CURRENT_USER } from "./types";
import axios from "axios";

export const getUserSkills = (userId) => (dispatch) => {
  axios
    .get("/api/users/skills", {
      params: {
        user_id: userId,
      },
    })
    .then((res) => {
      console.log("🚀 ~ file: profileAction.js ~ line 14 ~ .then ~ res", res);
      dispatch({
        type: GET_SKILLS,
        payload: res.data.skills,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERROR,
        payload: err.response.data,
      })
    );
};
export const addSkills = (userId, skills, skillsId, history) => (dispatch) => {
  let insertSkillObject = {
    user_id: userId,
    skills: skills,
  };
  if (skillsId) {
    insertSkillObject["id"] = skillsId;
  }

  axios
    .post("/api/users/skills", insertSkillObject)
    .then((res) => {
      window.location.reload();
    })
    .catch((err) =>
      dispatch({
        type: GET_ERROR,
        payload: err.response.data,
      })
    );
};
// Clear profile
export const clearCurrentUser = () => {
  return {
    type: CLEAR_CURRENT_USER,
  };
};
