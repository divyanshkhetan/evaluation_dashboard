// Imports
import { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";
import axios from "axios";

axios.defaults.withCredentials = true;

const AuthState = (props) => {
  // Set initial state
  const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,
  };

  // Init Reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    try {
      // Make a get request at localhost:5000/auth
      const res = await axios.get("/auth");

      // Dispatch the action to reducer for USER_LOADED
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      if (err.response.status === 401) {
        console.log("This is the desired behaviour");
      }
      // Dispatch the action to reducer for AUTH_ERROR
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Login User
  const login = async (formData) => {
    // Set header of the input data
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      // Make a post request at localhost:5000/auth
      const res = await axios.post("auth", formData, config);

      // Dispatch the action to reducer for LOGIN_SUCCESS
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      // Load the user after successful login
      loadUser();
    } catch (err) {
      // Dispatch the action to reducer for LOGIN_FAIL
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Logout
  const logout = async () => {
    try {
      await axios.delete("/auth");

      // Dispatch the action to reducer for LOGOUT
      dispatch({ type: LOGOUT });
    } catch (err) {
      console.log(err);
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
    <AuthContext.Provider
      // Provide these values to all components wrapped in AuthContext in App.js
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        error: state.error,
        login,
        loadUser,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;