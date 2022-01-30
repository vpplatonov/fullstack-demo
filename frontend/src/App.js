// import logo from './logo.svg';
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { About } from "./components/About";
import { SpendingTracker } from "./components/SpendingTracker";

function App() {
  return (
    <Router>
      <Navbar />

      <div className="container p-4">
        <Routes>
          <Route exact path="/" element={<SpendingTracker />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
