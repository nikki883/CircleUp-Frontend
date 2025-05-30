import react from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Components
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./Components/Sidebar.jsx"
import SignUp from "./components/SignUp.jsx";
import Login from "./components/Login.jsx";

//pages
import Explore from "./pages/Explore.jsx";
import Profile from "./pages/Profile.jsx";

export default function App() { 
  return (
    <BrowserRouter>
      <Navbar />
      {/* <Sidebar/> */}
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
