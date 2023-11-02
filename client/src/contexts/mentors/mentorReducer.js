import {
  MENTOR_FETCH_SUCCESS,
  MENTOR_FETCH_FAIL,
  STUDENT_FETCH_SUCCESS,
  STUDENT_FETCH_FAIL,
  ASSIGNED_FETCH_SUCCESS,
  ASSIGNED_FETCH_FAIL,
  UNASSIGNED_FETCH_SUCCESS,
  UNASSIGNED_FETCH_FAIL,
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

    case ASSIGNED_FETCH_SUCCESS:
      return { ...state, Assigned: action.payload, error: null };

    case ASSIGNED_FETCH_FAIL:
      return { ...state, Assigned: [], error: action.payload };

    case UNASSIGNED_FETCH_SUCCESS:
      return { ...state, Unassigned: action.payload, error: null };

    case UNASSIGNED_FETCH_FAIL:
      return { ...state, Unassigned: [], error: action.payload };

    default:
      return state;
  }
};

export default mentorReducer;
