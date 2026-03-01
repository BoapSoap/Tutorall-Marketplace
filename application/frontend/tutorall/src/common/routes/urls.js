/*
URLS to be served to axios/react-query in order to call the backend.

URLs shoukd follow patterns:

<model name> : {
  getBase: `api/model/`,
  post: `api/model/`,
  ...
},

- Matthew A. Davis
*/

import React from 'react';

export const urls = {
  auth: {
    login: `api/token-auth/`,
    register: `api/users/register/`
  },
  adverts: {
    getBase: `api/adverts/`,
    getFiltered: (categories, courses, professors, sort) => `/api/adverts/?catagories=${categories}&courses=${courses}&professors=${professors}&verified=true&ordering=${sort}price_range`,
    getDetail: (id) => `/api/adverts/${id}/`,
    create: `/api/adverts/create/`,
    delete: (id) => `api/adverts/${id}/remove_advert/`,

  },
  categories: {
    getBase: `/api/catagories/`,
  },
  courses: {
    getBase: `/api/courses/`,
    getDetail: (id) => `/api/courses/${id}/`,
  },
  files: {
    getBase: `/api/files/`,
    getDetail: (id) => `/api/files/${id}/`,
    upload: `/api/files/`,
  },
  messages: {
    getBase: `/api/messages/`,
    create: (id) => `api/adverts/${id}/message/`
  },
  users: {
    getBase: `/api/users/`,
    getByID: (id) => `/api/users/${id}/`,
    getUserAdverts: (id) => `/api/users/${id}/adverts/`,
    getUserMessages: (id) => `/api/users/${id}/messages/`,
  }
}
