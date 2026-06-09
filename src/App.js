import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TurfDetails from "./pages/TurfDetails";
import MyBookings from "./pages/MyBookings";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* APP OPEN AVVAGANE DIRECT GA REGISTER PAGE KI VELLADANIKI */}
        <Route path="/" element={<Navigate to="/register" replace />} />
        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* PROTECTED TURF TRACKING ROUTES */}
        <Route path="/explore" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/turf/:id" element={<ProtectedRoute><TurfDetails /></ProtectedRoute>} />
        <Route path="/bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        
        {/* OKAVELA WRONG URL KODITHE MALLI REGISTER PAGE KI PAMPADANIKI */}
        <Route path="*" element={<Navigate to="/register" replace />} />
      </Routes>
    </>
  );
}

export default App;