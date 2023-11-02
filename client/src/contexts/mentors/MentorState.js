// Imports
import { useReducer } from "react";
import MentorContext from "./mentorContext";
import mentorReducer from "./mentorReducer";
import {
  MENTOR_FETCH_SUCCESS,
  MENTOR_FETCH_FAIL,
  STUDENT_FETCH_SUCCESS,
  STUDENT_FETCH_FAIL,
  CLEAR_ERRORS,
} from "../types";
import axios from "axios";

axios.defaults.withCredentials = true;

const MentorState = (props) => {
  // Set initial state
  const initialState = {
    Mentors: [],
    Students: [],
    error: null,
  };

  // Init Reducer
  const [state, dispatch] = useReducer(mentorReducer, initialState);

  // Fetch All Mentors
  const fetchMentors = async () => {
    try {
      // Make a get request at localhost:5000/mentors
      const res = await axios.get("/mentors");

      dispatch({ type: MENTOR_FETCH_SUCCESS, payload: res.data });
    } catch (err) {
      if (err.response.status === 401) {
        console.log("This is the desired behaviour");
      }
      dispatch({ type: MENTOR_FETCH_FAIL });
    }
  };

  // Fetch All Students
  const fetchStudents = async () => {
    try {
      // Make a get request at localhost:5000/mentors
      const res = await axios.get("/students");

      dispatch({ type: STUDENT_FETCH_SUCCESS, payload: res.data });
    } catch (err) {
      if (err.response.status === 401) {
        console.log("This is the desired behaviour");
      }
      dispatch({ type: STUDENT_FETCH_FAIL });
    }
  };

  // Clear Errors
  const clearErrors = () => {
    // Dispatch the action to reducer for CLEAR_ERRORS
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  return (
    <MentorContext.Provider
      // Provide these values to all components wrapped in AuthContext in App.js
      value={{
        Mentors: state.Mentors,
        error: state.error,
        Students: state.Students,
        fetchMentors,
        clearErrors,
        fetchStudents
      }}
    >
      {props.children}
    </MentorContext.Provider>
  );
};

export default MentorState;