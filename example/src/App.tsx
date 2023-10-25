import React from "react";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./components/Add";
import UpdateProducts from "./components/Update";
import DestroyProducts from "./components/Destroy";

const App: React.FC = () => {
  return(
    <BrowserRouter>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Products/>}/>
        <Route path="/add" element={<Add />}/>
        <Route path="/update/:id" element={<UpdateProducts/>}/>
        <Route path="/delete/:id" element={<DestroyProducts/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
