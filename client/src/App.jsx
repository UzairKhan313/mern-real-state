import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  AboutPage,
  HomePage,
  LoginPage,
  ProfilePage,
  RegisterPage,
} from "./pages";
import { Header, PrivateRoutes } from "./components";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
