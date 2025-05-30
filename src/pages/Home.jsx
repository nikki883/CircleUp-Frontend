import axios from 'axios';
import React, { useEffect, useState } from 'react'


export default function Home() {

    const [posts ,setPosts] = useState([]);

    useEffect(()=>{
     
      async function fetchPosts() {
      try {
        const res = await axios.get("http://localhost:5500/api/posts/");
        setPosts(res.data.posts || res.data); 
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    }

    fetchPosts();
    },[])
  return (
    <div>
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((post) => (
          <div key={post._id}>
            <img
              src={post.postImage} 
              alt="Post"
              width={200}
            />
            <h1>{post.caption}</h1>
            <h2>{post.postBy?.fullname || "Unknown Author"}</h2>
          </div>
        ))
      )}

    </div>

  )};
