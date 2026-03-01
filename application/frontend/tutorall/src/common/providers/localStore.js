
/*
  Local context to query and cache information used in multiple locations. Reduces user wait time for fields that do not change.

  - Matthew A. Davis
*/
import React, { createContext, useContext, useReducer } from "react";
import axios, { AxiosInstance } from "axios";
import {
  getCategories,
  getCourses,
} from "../utils/commonCalls";
import { getPublicFetch } from "../utils/utils";
import { useQuery } from "@tanstack/react-query";

const LocalStoreContext = createContext(null);

export const LocalStoreProvider = props => {
  const client = getPublicFetch();

  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(client)
  });

  const courses = useQuery({
    queryKey: ['courses'],
    queryFn: () => getCourses(client)
  });

  return (
    <LocalStoreContext.Provider
      value={{categories, courses}}
    >
      {props.children}
    </LocalStoreContext.Provider>
  )
}

export const useLocalStoreContext = () => {
  return useContext(LocalStoreContext);
}

export default LocalStoreProvider;
