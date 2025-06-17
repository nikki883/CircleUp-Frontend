import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile({ UserData }) {
  let [posts, setAllPosts] = useState([]);

  useEffect(() => {
    if (!UserData?._id) return; // agar user data available nahi hai toh API call mat karo

    async function getUserPosts() {
      const post = await axios.get(
        `http://localhost:5500/api/posts/${UserData._id}`
      );
      setAllPosts(post.data);
      console.log(post.data, "ye console aaya");
    }
    getUserPosts();
  }, [UserData]);

  async function handleSubmit(e) {
    e.preventDefault();

    let PostImage = e.target.PostImage.value;
    let caption = e.target.caption.value;
    let postBy = UserData._id;

    let res = await axios.post("http://localhost:5500/api/posts", {
      PostImage,
      caption,
      postBy,
    });

    if (res.status == 200) {
      console.log(res.data);
    } else {
      console.log(res.data);
    }
  }

  return (
    <div>
      <centre>
        <h2>Profile Page of {UserData.username}</h2>
      </centre>
      {/* SHOW all Data */}
      <img height={100} src={UserData.profilePic} alt="" />
      <h3>{UserData.fullname}</h3>
      <p>Post Count: {UserData.postCount}</p>

      <hr />

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="PostImg" name="PostImage" />
        <input type="text" placeholder="Caption" name="caption" />
        <button>Post</button>
      </form>

      {posts.map((e) => (
    
          <img
            key={e._id}
            src={e.PostImage}
            alt={e.title}
            style={{
              width: "120px",
              height: "100px",
              objectFit: "cover",
              margin:"10px"
            }}
          />
      ))}
    </div>
  );
}
