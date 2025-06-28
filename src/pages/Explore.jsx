// import react, { useState, useEffect } from "react";
// import axios from "axios";

// import { Link } from 'react-router-dom';
// import PostModel from "../components/postModel";

// export default function Explore() {
//   let [AllPost, setAllPost] = useState([]);

//   useEffect(() => {
//     async function GetAllPost() {
//       let res = await axios.get("http://localhost:5500/api/posts",
//        {
//           headers:{
//              Authorization: `${JSON.parse(localStorage.getItem("User")).token}`,
//           },
//       }
//       );
//       console.log("API Response:", res.data);
//       if (res.status == 200) {
//         setAllPost(res.data.posts);
//       } else {
//         console.log(res.data.posts);
//       }
//     }

//     GetAllPost();
//   }, []);

//   return (
//     <div>
//       {AllPost.map((post, i) => {
//         return (
//           <div key={i}>
//               <Link to={`/profile/${post.postBy._id}`}>
//             <img height={10}
//               src={
//                 post?.postBy?.profilePic || "https://via.placeholder.com/100"
//               }
//               alt="userpic"
//             />
//             <span>{post?.postBy?.username || "Anonymous"}</span>
//             </Link>
//             <br/>
//             <img height={100} src={post.PostImage} />
//             <p>{post.caption}</p>
//              <br/>
//               <br/>
//           </div>
//         );
//       })}
//     </div>
//   );
// }


import { useState, useEffect } from "react"
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

import PostModel from "../components/PostModel"
import "../styles/Explore.css"

export default function Explore() {
  const [AllPost, setAllPost] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPost, setSelectedPost] = useState(null)

  useEffect(() => {
    async function GetAllPost() {
      try {
        const res = await axios.get("http://localhost:5500/api/posts", {
          headers: {
            Authorization: `${JSON.parse(localStorage.getItem("User")).token}`,
          },
        })
        if (res.status == 200) {
          setAllPost(res.data.posts)
        }
      } catch (error) {
        console.error("Error fetching posts:", error)
      } finally {
        setLoading(false)
      }
    }

    GetAllPost()
  }, [])

  const handlePostClick = (post) => {
    const postData = {
      postImage: post.PostImage,
      caption: post.caption,
      postBy: {
        username: post.postBy.username,
        profilePic: post.postBy.profilePic,
      },
      likes: post.likes || [],
      comments: post.comments || [],
    }
    setSelectedPost(postData)
  }

  if (loading) {
    return (
      <div className="explore-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="explore-container">
      <div className="posts-feed">
        {AllPost.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📷</div>
            <h3 className="empty-title">No Posts Yet</h3>
            <p className="empty-description">When people share photos, you'll see them here.</p>
          </div>
        ) : (
          AllPost.map((post, i) => {
            return (
              <div key={i} className="post-card">
                <div className="post-header">
                  <Link to={`/profile/${post.postBy._id}`} className="user-info">
                    <img
                      className="user-avatar"
                      src={post?.postBy?.profilePic || "https://via.placeholder.com/32"}
                      alt="userpic"
                    />
                    <div>
                      <span className="username">{post?.postBy?.username || "Anonymous"}</span>
                      <div className="post-time">{  moment(post.createdAt).fromNow()}</div>
                    </div>
                  </Link>
                </div>

                <div className="post-image-container" onClick={() => handlePostClick(post)}>
                  <img className="post-image" src={post.PostImage || "/placeholder.svg"} alt={post.caption} />
                </div>

                <div className="post-content">
                  <div className="post-actions">
                    <button className="action-btn">
                      <span>♥</span>
                    </button>
                    <button className="action-btn">
                      <span>💬</span>
                    </button>
                    <button className="action-btn">
                      <span>📤</span>
                    </button>
                    <span className="likes-count">{post.likes?.length || 0} likes</span>
                  </div>
                  <p className="post-caption">
                    <strong>{post?.postBy?.username || "Anonymous"}</strong> {post.caption}
                  </p>
                </div>
              </div>
            )
          })
        )}
      </div>

      {selectedPost && <PostModel postData={selectedPost} onClose={() => setSelectedPost(null)} />}
    </div>
  )
}
