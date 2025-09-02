// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Profile from "../pages/Profile";
import Upload from "../pages/Upload";
import Roast from "../pages/Roast";
import GoogleLogin from "../pages/GoogleLogin";
import PrivateRoute from "../components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/google-login" element={<GoogleLogin />} />
        
        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/roast" element={<Roast />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
