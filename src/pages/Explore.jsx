import react, { useState, useEffect } from "react";
import axios from "axios";

import { Link } from 'react-router-dom';
import PostModel from "../components/postModel";

export default function Explore() {
  let [AllPost, setAllPost] = useState([]);

  useEffect(() => {
    async function GetAllPost() {
      let res = await axios.get("http://localhost:5500/api/posts",
       {
          headers:{
             Authorization: `${JSON.parse(localStorage.getItem("User")).token}`,
          },
      }
      );
      console.log("API Response:", res.data);
      if (res.status == 200) {
        setAllPost(res.data.posts);
      } else {
        console.log(res.data.posts);
      }
    }

    GetAllPost();
  }, []);

  return (
    <div>
      {AllPost.map((post, i) => {
        return (
          <div key={i}>
              <Link to={`/profile/${post.postBy._id}`}>
            <img height={10}
              src={
                post?.postBy?.profilePic || "https://via.placeholder.com/100"
              }
              alt="userpic"
            />
            <span>{post?.postBy?.username || "Anonymous"}</span>
            </Link>
            <br/>
            <img height={100} src={post.PostImage} />
            <p>{post.caption}</p>
             <br/>
              <br/>
          </div>
        );
      })}
    </div>
  );
}
