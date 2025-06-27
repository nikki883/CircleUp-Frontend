import react, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Components
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import SignUp from "./components/SignUp.jsx";
import Login from "./components/Login.jsx";

//pages
import Explore from "./pages/Explore.jsx";
import Profile from "./pages/Profile.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

export default function App() {
  let [UserData, setUserData] = useState(null);
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    function GetDataFromLocalStorage() {
      try {
        let Data = JSON.parse(localStorage.getItem("User"));
        if (Data) {
          setUserData(Data);
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        // Clear corrupted data
        localStorage.removeItem("User");
        setUserData(null);
      } finally {
        setLoading(false);
      }
    }

    GetDataFromLocalStorage();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Navbar UserData={UserData} setUserData={setUserData} />
      {/* <Sidebar/> */}
      <Routes>
        <Route
          path="/"
          element={<PrivateRoute UserData={UserData} Component={<Explore />} />}
        />
        <Route
          path="/profile/:userId"
          element={<PrivateRoute UserData={UserData} Component={<Profile />} />}
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute
              UserData={UserData}
              Component={<Profile UserData={UserData} />}
            />
          }
        />
        <Route path="/signUp" element={<SignUp setUserData={setUserData} />} />
        <Route path="/login" element={<Login setUserData={setUserData} />} />
      </Routes>
    </BrowserRouter>
  );
}
