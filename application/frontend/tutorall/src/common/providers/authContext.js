/*

authContext stores variable relating to user and authentication, and synchs them with localStorage (browser cache) to persist between page refreshes and browser close.

userID - User's ID
userName - User's username
expire_time - when the token will expire
token - token gained during login for authentication
isLoggedIn - is user logged in (default false)
isLoading - intermediary variable while user is trying to login
error - store error if any is encountered during login

- Matthew A. Davis
*/

import React, { createContext, useContext, useReducer } from "react";
import { getBaseURL } from "../utils/utils";
import axios from "axios";

const initialState = {
  id: localStorage.getItem("id") || null,
  first_name: localStorage.getItem("first_name") || null,
  last_name: localStorage.getItem("last_name") || null,
  email: localStorage.getItem("email") || null,
  expire_time: localStorage.getItem("expires_time") || null,
  token: localStorage.getItem("token") || null,
  isLoggedIn: false,
  isLoading: false,
  error: "",
  build: "",
};

const setLocalAuth = (id, first_name, last_name, email, expire_time, token) => {
  id && localStorage.setItem("id", id);
  first_name && localStorage.setItem("first_name", first_name);
  last_name && localStorage.setItem("last_name", last_name);
  email && localStorage.setItem("email", email);
  expire_time && localStorage.setItem("expire_time", expire_time);
  token && localStorage.setItem("token", token);
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("first_name");
  localStorage.removeItem("last_name");
  localStorage.removeItem("email");
  localStorage.removeItem("id");
  localStorage.removeItem("expire_time");
  localStorage.removeItem("redirect_on_login");
};

const authReducer = (auth = {}, action) => {
  switch (action.type) {
    case "LOGIN_PENDING":
        auth.error = "";
        auth.isLoading = true;
        auth.isLoggedIn = false;
        return auth;
      break;
    case "LOGIN_SUCCESS":
        setLocalAuth(
          action.payload.id,
          action.payload.account.first_name,
          action.payload.account.last_name,
          action.payload.email,
          action.payload.expire_time,
          action.payload.token
        )

          auth.id = action.payload.id;
          auth.first_name = action.payload.account.first_name;
          auth.last_name = action.payload.account.last_name;
          auth.email = action.payload.email;
          auth.expire_time = action.payload.expire_time;
          auth.token = action.payload.token;
          auth.isLoggedIn = true;
          auth.isLoading = false;
          auth.error = "";
          auth.build = action.payload.build;

          return auth;
      break;
    case "LOGOUT":
    logout();
        auth.id = null;
        auth.first_name = null;
        auth.last_name = null;
        auth.email = null;
        auth.expire_time = null;
        auth.token = null;
        auth.isLoggedIn = false;
        auth.isLoading = false;
        auth.error = "";
        return auth;
      break;
    default:
      return auth;
  }
}

const AuthContext = createContext(null);

export const AuthProvider = props => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const isAuthenticated = () => {
    if (!localStorage.getItem("token")) {
      return false;
    }
    return true;
  }

  return (
    <AuthContext.Provider value={{state, dispatch, isAuthenticated}}>
      {props.children}
    </AuthContext.Provider>
  )
};

export const useAuthContext = () => {
  return useContext(AuthContext);
}


export default AuthProvider;
