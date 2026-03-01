/*

queryContext stores an authenticated axios instance instantiated after user has logged in.

-Matthew A. Davis
*/

import React, { createContext, useContext, useReducer } from "react";
import axios, { AxiosInstance } from "axios";
import { useAuthContext } from "./authContext";
import { getBaseURL } from "../utils/utils";
import { useQueryClient } from '@tanstack/react-query'

const QueryContext = createContext(null);

export const QueryContextProvider = props => {

  const { state } = useAuthContext();
  const queryClient = axios.create({
    baseURL: getBaseURL(),
  });

  const refreshQuery = useQueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  })

  queryClient.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Token ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  queryClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <QueryContext.Provider value={{queryClient, refreshQuery }} >
      {props.children}
    </QueryContext.Provider>
  )
};

export const useQueryContext = () => {
  return useContext(QueryContext);
}

export default QueryContextProvider;
