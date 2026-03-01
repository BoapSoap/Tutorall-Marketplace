/*
  Utility functions for the entire applications.

  getBaseURL - checks for an .env file to determine where to make axios calls

  getPublicFetch - non-auth axios instance for public calls

  publicLogin - utility function to login users with non-auth axios

  useLogout - utility function to clear cached user and direct user

  - Matthew A. Davis
*/
import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../providers/authContext"
import { urls } from "../routes/urls";

export const getBaseURL = () => {
  return process.env.REACT_APP_API_LOCAL === "true" ?
    "http://localhost:8080" : ""
};

export const getPublicFetch = () => {
  const url = getBaseURL();
  return axios.create({
    baseURL: url,
  })
}

export const publicLogin = async (email, password) => {
  const fetch = getPublicFetch();
  const { data } = await fetch.post(urls.auth.login, {username: email, password});
  return data;
}

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: "LOGOUT" })
    navigate("/")
  }

  return { logout };
}
