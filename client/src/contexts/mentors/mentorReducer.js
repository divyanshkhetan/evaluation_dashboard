import {
  MENTOR_FETCH_SUCCESS,
  MENTOR_FETCH_FAIL,
  STUDENT_FETCH_SUCCESS,
  STUDENT_FETCH_FAIL,
} from "../types";

// Change state according to the type of action
const mentorReducer = (state, action) => {
  switch (action.type) {
    case MENTOR_FETCH_SUCCESS:
      return { ...state, Mentors: action.payload, error: null };

    case MENTOR_FETCH_FAIL:
      return { ...state, Mentors: [], error: action.payload };

    case STUDENT_FETCH_SUCCESS:
      return { ...state, Students: action.payload, error: null };

    case STUDENT_FETCH_FAIL:
      return { ...state, Students: [], error: action.payload };

    default:
      return state;
  }
};

export default mentorReducer;
