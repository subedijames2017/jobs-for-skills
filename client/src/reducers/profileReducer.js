import { GET_SKILLS, ADD_SKILLS, CLEAR_CURRENT_USER } from "../actions/types";
const initialState = {
  skillsObject: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SKILLS:
      return {
        ...state,
        skillsObject: action.payload,
      };
    case CLEAR_CURRENT_USER:
      return {
        ...state,
        skillsObject: {},
      };
    default:
      return state;
  }
}
