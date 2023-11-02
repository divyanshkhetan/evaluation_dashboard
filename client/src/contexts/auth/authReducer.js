import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
  } from "../types";
  
  // Change state according to the type of action
  const authReducer = (state, action) => {
    switch (action.type) {
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
        };
  
      case LOGIN_SUCCESS:
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
        };
  
      case AUTH_ERROR:
      case LOGIN_FAIL:
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          error: action.payload,
        };
  
      case LOGOUT:
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          error: null,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export default authReducer;