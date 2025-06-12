import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ToDo from "./components/ToDo/ToDo";
import Calendar from "./components/Calendar/Calendar";

const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<ToDo />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
  
  );
};

export default App;
