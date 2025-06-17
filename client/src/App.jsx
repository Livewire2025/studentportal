import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Success from "./pages/Success";
import TestPage from "./pages/TestPage";
import './App.css';
import Frontpage from "./pages/Frontpage";
import Certificate from "./pages/Certificate";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Frontpage/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/certificate" element={<Certificate/>}/>
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}
