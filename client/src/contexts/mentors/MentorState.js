// Imports
import { useReducer, useContext } from "react";
import AuthContext from "../auth/authContext";
import MentorContext from "./mentorContext";
import mentorReducer from "./mentorReducer";
import {
  MENTOR_FETCH_SUCCESS,
  MENTOR_FETCH_FAIL,
  STUDENT_FETCH_SUCCESS,
  STUDENT_FETCH_FAIL,
  ASSIGNED_FETCH_FAIL,
  ASSIGNED_FETCH_SUCCESS,
  UNASSIGNED_FETCH_SUCCESS,
  UNASSIGNED_FETCH_FAIL,
  ASSIGN_SUCCESS,
  ASSIGN_FAIL,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  CLEAR_ERRORS,
  LOCK_SUCCESS,
} from "../types";
import axios from "axios";

axios.defaults.withCredentials = true;

const MentorState = (props) => {
  const authContext = useContext(AuthContext);
  const {loadUser} = authContext;
  // Set initial state
  const initialState = {
    Mentors: [],
    Students: [],
    Assigned: [],
    Unassigned: [],
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
      dispatch({ type: STUDENT_FETCH_FAIL });
    }
  };

  // Fetch Assigned Students
  const fetchAssigned = async () => {
    try {
      // Make a get request at localhost:5000/mentors
      const res = await axios.get("/students/mentor");

      dispatch({ type: ASSIGNED_FETCH_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: ASSIGNED_FETCH_FAIL });
    }
  };

  // Fetch Unassigned Students
  const fetchUnassigned = async () => {
    try {
      // Make a get request at localhost:5000/mentors
      const res = await axios.get("/students/unassigned");

      dispatch({ type: UNASSIGNED_FETCH_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: UNASSIGNED_FETCH_FAIL });
    }
  };

  // Assign
  const assign = async (formData) => {
    // Set header of the input data
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      // Make a get request at localhost:5000/mentors
      const res = await axios.post("/mentors/assign", formData, config);

      dispatch({ type: ASSIGN_SUCCESS, payload: res.data });

      loadUser();
      fetchAssigned();
      fetchUnassigned();
    } catch (err) {
      dispatch({ type: ASSIGN_FAIL });
    }
  };

  // Update Marks
  const updateMarks = async (formData) => {
    // Set header of the input data
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      // Make a get request at localhost:5000/mentors
      const res = await axios.post("/students/update", formData, config);

      dispatch({ type: UPDATE_SUCCESS, payload: res.data });

      fetchAssigned();
    } catch (err) {
      dispatch({ type: UPDATE_FAIL });
    }
  };

  // Lock Profile
  const lock = async () => {
    try {
      // Make a get request at localhost:5000/mentors
      const res = await axios.put("/mentors/lock");

      dispatch({ type: LOCK_SUCCESS, payload: res.data });
      loadUser();
    } catch (err) {
      dispatch({ type: LOCK_SUCCESS });
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
        Assigned: state.Assigned,
        Unassigned: state.Unassigned,
        fetchMentors,
        clearErrors,
        fetchStudents,
        fetchAssigned,
        fetchUnassigned,
        assign,
        updateMarks,
        lock
      }}
    >
      {props.children}
    </MentorContext.Provider>
  );
};

export default MentorState;
