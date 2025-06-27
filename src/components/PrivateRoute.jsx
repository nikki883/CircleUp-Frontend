import React ,{useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute({ UserData, Component }) {

  //useNavigate: React Router ka hook hai jo programmatically navigate karne ke kaam aata hai.
  let navigate = useNavigate();


  //Ye ensure karta hai ki redirect tab ho jab component render ho chuka ho (not during render itself )
  useEffect(() => {

    //// Jab component render ho jaye, tab check karo user login hai ya nahi
    if (UserData === null) {
      navigate("/login");
    }
  },
  // Jab component render ho jaye, tab check karo user login hai ya nahi
   [UserData]);

  if (!UserData) {
    return null;
  }

  return Component;
}
