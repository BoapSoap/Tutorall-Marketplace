/*
  Common calls used throughout the application. Meant for components that are commonly seen or localStore.

  - Matthew A. Davis & Anmol Tadikonda
*/

import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { urls } from "../routes/urls";

export const getAdverts = async (queryClient) => {
  const { data } = await queryClient.get(urls.adverts.getBase);
  return data;
}

export const getAdvertsFiltered = async (queryClient, categories, courses, professors, sort) => {
  const { data } = await queryClient.get(urls.adverts.getFiltered(categories, courses, professors, sort));
  return data;
}

export const getAdvertDetail = async (queryClient, advertId) => {
  const { data } = await queryClient.get(urls.adverts.getDetail(advertId));
  return data;
}

export const getCategories = async (queryClient) => {
  const { data } = await queryClient.get(urls.categories.getBase);
  return data;
}

export const getCourses = async (queryClient) => {
  const { data } = await queryClient.get(urls.courses.getBase);
  return data;
}

const postRegister = async ({
  queryClient,
  first_name,
  last_name,
  email,
  password
}) => {
  const { data } = await queryClient.post(urls.auth.register, {
    first_name,
    last_name,
    email,
    password
  })
  return data;
}

export const usePostRegister = () => {
  return useMutation({
    mutationFn: postRegister,
  });
}

export const uploadFile = async (queryClient, formData) => {
  const { data } = await queryClient.post(urls.files.upload, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export const createAdvert = async (queryClient, advert) => {
  const { data } = await queryClient.post(urls.adverts.create, advert);
  return data;
}

export const sendMessage = async (queryClient, id, message) => {
  const { data } = await queryClient.post(urls.messages.create(id), message);
  return data;
}

export default getAdverts;
