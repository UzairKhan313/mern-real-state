import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  AboutPage,
  HomePage,
  LoginPage,
  ProfilePage,
  RegisterPage,
} from "./pages";
import { Header } from "./components";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
