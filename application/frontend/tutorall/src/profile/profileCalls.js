/*
  Calls for the profile components.

  - Matthew A. Davis
*/
import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { urls } from "../common/routes/urls";

export const getUserAdverts = async (queryClient, id) => {
  const { data } = await queryClient.get(urls.users.getUserAdverts(id));
  return data;
}

export const getUserMessages = async (queryClient, id) => {
  const { data } = await queryClient.get(urls.users.getUserMessages(id));
  return data;
}

const deleteAdvert = async ({
  queryClient,
  id
}) => {
  const { data } = await queryClient.get(urls.adverts.delete(id))
  return data;
}

export const useDeleteAdvert = () => {
  return useMutation({
    mutationFn: deleteAdvert,
  });
}
