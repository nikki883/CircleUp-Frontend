import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  let [userData, setUserData] = useState({});

  useEffect(() => {
    function GetUserDataFromLocalStroage() {
      let Data = JSON.parse(localStorage.getItem("User"));
      setUserData(Data);
      console.log(Data);
    }

    GetUserDataFromLocalStroage();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    let PostImage = e.target.PostImage.value;
    let caption = e.target.caption.value;
    let postBy = userData._id;

    let res = await axios.post("http://localhost:5500/api/posts", {
      PostImage,
      caption,
      postBy,
    });

    if(res.status == 200)
        {
            console.log(res.data)
        }
        else
        {
            console.log(res.data)
        }
  }


  return (
    <div>
      <centre>
        <h2>Profile Page of {userData.username}</h2>
      </centre>
      {/* SHOW all Data */}
      <img height={400} src={userData.profilePic} alt="" />
      <h3>{userData.fullname}</h3>
      <p>Post Count: {userData.postCount}</p>

      <hr />

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="PostImg" name="PostImage" />
        <input type="text" placeholder="Caption" name="caption" />
        <button>Post</button>
      </form>
    </div>
  );
}
