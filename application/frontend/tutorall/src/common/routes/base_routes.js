/*
Router for URLs using react-router. Builds all routes for Node.js app.

All routes should be nested within DefaultLayout route to provide base layout to all pages.
- Matthew A. Davis
*/

import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import App from "../../App";
import AboutHome from "../about/about_home";
import AboutMatthew from "../about/about_matthew";
import AboutAnmol from "../about/about_anmol";
import AboutJustine from "../about/about_justine";
import AboutTan from "../about/about_tan";
import AboutZainab from "../about/about_zainab";
import Profile from "../../profile";

import DefaultLayout from "../theme/defaultLayout";
import SearchAdverts from "../homesearch/searchAdverts";
import HomePage from "../theme/homepage";

import Login from "../../auth/Login";
import Register from "../../auth/Register";
import ListingCreation from "../../listingCreation/ListingCreation";
import ListingCreationThankYou from "../../listingCreation/ListingCreationThankYou";
import ListingDetails from "../../tutorlistingview/ListingDetails";
import MessagePage from "../../tutorlistingview/MessagePage";

import ProfilePage from "../../profile/userProfile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<HomePage/>} />
          <Route path="/search" element={<SearchAdverts />} />
            <Route path="/search/:categories" element={<SearchAdverts />} />
            <Route path="/search/filler/:courses" element={<SearchAdverts />} />
            <Route path="/search/:categories/:courses" element={<SearchAdverts />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/listing_creation" element={<ListingCreation />} />
          <Route path="/listing_creation/thankyou" element={<ListingCreationThankYou />} />
          <Route path="/about" element={<AboutHome />} />
            <Route path="/about_me/matthew_davis" element={<AboutMatthew/>} />
            <Route path="/about_me/anmol_tadikonda" element={<AboutAnmol />} />
            <Route path="/about_me/justine_tenorio" element={<AboutJustine />} />
            <Route path="/about_me/tan_huynh" element={<AboutTan />} />
            <Route path="/about_me/zainab_abbasi" element={<AboutZainab />} />
          <Route path="/about" element={<AboutHome/>} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/listings/:listingID/:messaging?" element={<ListingDetails />} />
          <Route path="/message/:receiver/:listingID" element={<MessagePage />} />
        </Route>
    </>
  )
)

export default router;
