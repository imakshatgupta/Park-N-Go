import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Parking from "./Pages/Parking.jsx";
import Slot from "./Pages/Slot.jsx";
import SlotEntry from "./Pages/SlotEntry.jsx";
import SlotExit from "./Pages/SlotExit.jsx";
import Admin from "./Pages/Admin.jsx";
import ParkArea from "./Pages/ParkArea.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
  <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Parking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/parking" element={<Parking />} />
        <Route path="/park" element={<ParkArea />} />
        <Route path="/slot" element={<Slot />} />
        <Route path="/slotentry" element={<SlotEntry />} />
        <Route path="/slotexit" element={<SlotExit />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <ToastContainer />
    </Router>
  </div>
);

export default App;
