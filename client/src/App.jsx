import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Header, PrivateRoutes } from "./components";

import {
  AboutPage,
  CreateListingPage,
  HomePage,
  Listing,
  LoginPage,
  ProfilePage,
  RegisterPage,
  UpdateListing,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create-listing" element={<CreateListingPage />} />
          <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
