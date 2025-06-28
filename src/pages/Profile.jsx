// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";


// export default function Profile({ UserData }) {
//    let Data = JSON.parse(localStorage.getItem("User"));

//   const { userId } = useParams(); // dynamic userId from route
//   const currentUserId = Data?._id;

//   const isOwnProfile = !userId || userId === currentUserId;
//   const effectiveUserId = userId || currentUserId;

//   console.log({
//   userId,
//   currentUserId,
//   effectiveUserId,
//   isOwnProfile,
// });


//   let [posts, setAllPosts] = useState([]);
//   let [user,setUser] = useState([]);
//   let [ProfileUpdating, setProfileUpdating] = useState(false);
//   let [showEditForm, setShowEditForm] = useState(false);
//   let [showPostForm, setShowPostForm] = useState(false);
//   const [postImage, setPostImage] = useState("");
//   const [caption, setCaption] = useState("");
  


//   useEffect(() => {
//     if (!effectiveUserId) return; // agar user data available nahi hai toh API call mat karo

//     async function getUserPosts() {
//        let Data = JSON.parse(localStorage.getItem("User"));
//        console.log(Data._id);
//       const post = await axios.get(
//         `http://localhost:5500/api/posts/postBy/${effectiveUserId}`
//       ,{
//           headers:{
//              Authorization: `${JSON.parse(localStorage.getItem("User")).token}`,
//           },
//         });

//       setAllPosts(post.data);
//       console.log(post.data, "ye console aaya posts mangne pr");
//     }
//     getUserPosts();
//   }, [effectiveUserId, ProfileUpdating]);

//   async function handleUpdateSubmit(e){
//         e.preventDefault();
//          setProfileUpdating(true);
       
//         let res = await axios.put(`http://localhost:5500/api/users/update/${UserData._id}`,
//         {
           
//                 profilePic: e.target.profilePic.value,
//                 fullname: e.target.fullname.value,
//                 username: e.target.username.value,
//                 bio: e.target.bio.value,
//                 email: e.target.email.value,
            
//         },{
//           headers:{
//              Authorization: `${JSON.parse(localStorage.getItem("User")).token}`,
//           },
//         });
   
//          if(res.status == 200) {
//             console.log(res.data)
//             setShowEditForm(false);
//         } else {
//             console.log(res.data)
//         } 
//          setProfileUpdating(false);
//   }
 
//   async function handlePostSubmit(e) {
//     e.preventDefault();
//     setProfileUpdating(true);

//     let PostImage = e.target.PostImage.value;
//     let caption = e.target.caption.value;
//      let postBy = UserData._id;

//     let res = await axios.post("http://localhost:5500/api/posts", {
//       PostImage,
//       caption,
//       postBy,
//     },{
//           headers:{
//              Authorization: `${JSON.parse(localStorage.getItem("User")).token}`,
//           },
//         });

//     if (res.status == 200) {
//       console.log(res.data,"profile ke handle submit ka console");
//     } else {
//       console.log(res.data);
//     }

//       setTimeout(() => { 
//             setProfileUpdating(false);
//         }, 2000);
//     setPostImage("");
//     setCaption("");
//   }

//   useEffect(()=>{
//     async function BandeKiProfileKaInfo() {
      
//       const userInfo = await axios.get(`http://localhost:5500/api/users/${effectiveUserId}`);
//       setUser(userInfo.data);
//       console.log(userInfo.data,"bandekiprofileka console hai");
//     }

//      BandeKiProfileKaInfo();
//   },[effectiveUserId, ProfileUpdating]);

//   return (
//     <div>
//       <div>

//       <centre>
//         <h2>{user.username}</h2>
//       </centre>
//       {/* SHOW all Data */}
//       <img height={100} src={user.profilePic} alt="" />
//       <p>{user.bio || "bio goes here..."}</p>
//       <p>Post Count: {user.postCount}</p>
//       </div>
//       {isOwnProfile && (
//       <div>
//         <button onClick={() => setShowEditForm(!showEditForm)}>Edit profile</button>
//        <button onClick={() => setShowPostForm(!showPostForm)}>Share post</button>
//       </div>
//       )}

//        <br/>
//       <hr />
//       {showEditForm && (
//         <div>
//         <h2 >Edit Profile</h2>
//         <form onSubmit={handleUpdateSubmit}>
//           <input type="text" 
//            defaultValue={user?.profilePic || ''} 
//            name="profilePic"
//            placeholder="Profile Pic URL" />
//              <br/>
//            <input
//               defaultValue={user?.fullname || ''} 
//               type="text" 
//               placeholder="Full Name"  
//               name="fullname"/>
//                 <br/>
//             <input 
//             defaultValue={user?.username || ''} 
//             type="text" 
//             placeholder="user Name"
//             name="username"/> 
//               <br/> 
//                <input 
//             defaultValue={user?.bio || ''} 
//             type="text" 
//             placeholder="user bio"
//             name="bio"/> 
//               <br/> 
//             <input 
//               defaultValue={user?.email || ''} 
//               type="email" 
//               placeholder="Email" 
//               name="email"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
//               />
//                 <br/>
//               <button 
//                 type="submit"
//                 className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
//                >
//                 Update
//               </button>
//                <button 
//                 type="button"
//                 onClick={() => setShowEditForm(false)}
//                 className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
//               >
//                 Cancel
//               </button>
//         </form>
//         <br/>
//         </div>
//       )}

//       {showPostForm && (
//       <div>
//         <h2>Share Post</h2>
//       <form onSubmit={handlePostSubmit}>
//         <input type="text" 
//         placeholder="PostImg" 
//         name="PostImage" 
//         value={postImage}
//         onChange={(e) => setPostImage(e.target.value)} />
//         <br/>
//         <input type="text" 
//         placeholder="Caption" 
//         name="caption"
//         value={caption} 
//         onChange={(e) => setCaption(e.target.value)}/>
//         <br/>
//         <button type="submit">Post</button>
//         <button  type="button" onClick={() => setShowPostForm(false)} >Cancel</button>
        
//       </form>
  
//       </div>
//       )}
      
//       {posts.map((e) => (
    
//           <img
//             key={e._id}
//             src={e.PostImage}
//             alt={e.title}
//             style={{
//               width: "120px",
//               height: "100px",
//               objectFit: "cover",
//               margin:"10px"
//             }}
//           />
//       ))}
//     </div>
//   );
// }


"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import PostModel from "../components/PostModel"
import "../styles/Profile.css"

export default function Profile({ UserData }) {
  const Data = JSON.parse(localStorage.getItem("User"))

  const { userId } = useParams()
  const currentUserId = Data?._id

  const isOwnProfile = !userId || userId === currentUserId
  const effectiveUserId = userId || currentUserId

  const [posts, setAllPosts] = useState([])
  const [user, setUser] = useState([])
  const [ProfileUpdating, setProfileUpdating] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [showPostForm, setShowPostForm] = useState(false)
  const [postImage, setPostImage] = useState("")
  const [caption, setCaption] = useState("")
  const [selectedPost, setSelectedPost] = useState(null)

  useEffect(() => {
    if (!effectiveUserId) return

    async function getUserPosts() {
      const Data = JSON.parse(localStorage.getItem("User"))
      const post = await axios.get(`http://localhost:5500/api/posts/postBy/${effectiveUserId}`, {
        headers: {
          Authorization: `${JSON.parse(localStorage.getItem("User")).token}`,
        },
      })

      setAllPosts(post.data)
    }
    getUserPosts()
  }, [effectiveUserId, ProfileUpdating])

  async function handleUpdateSubmit(e) {
    e.preventDefault()
    setProfileUpdating(true)

    const res = await axios.put(
      `http://localhost:5500/api/users/update/${UserData._id}`,
      {
        profilePic: e.target.profilePic.value,
        fullname: e.target.fullname.value,
        username: e.target.username.value,
        bio: e.target.bio.value,
        email: e.target.email.value,
      },
      {
        headers: {
          Authorization: `${JSON.parse(localStorage.getItem("User")).token}`,
        },
      },
    )

    if (res.status == 200) {
      setShowEditForm(false)
    }
    setProfileUpdating(false)
  }

  async function handlePostSubmit(e) {
    e.preventDefault()
    setProfileUpdating(true)

    const PostImage = e.target.PostImage.value
    const caption = e.target.caption.value
    const postBy = UserData._id

    const res = await axios.post(
      "http://localhost:5500/api/posts",
      {
        PostImage,
        caption,
        postBy,
      },
      {
        headers: {
          Authorization: `${JSON.parse(localStorage.getItem("User")).token}`,
        },
      },
    )

    if (res.status == 200) {
      console.log(res.data)
    }

    setTimeout(() => {
      setProfileUpdating(false)
    }, 2000)
    setPostImage("")
    setCaption("")
    setShowPostForm(false)
  }

  useEffect(() => {
    async function BandeKiProfileKaInfo() {
      const userInfo = await axios.get(`http://localhost:5500/api/users/${effectiveUserId}`)
      setUser(userInfo.data)
    }

    BandeKiProfileKaInfo()
  }, [effectiveUserId, ProfileUpdating])

  const handlePostClick = (post) => {
    const postData = {
      postImage: post.PostImage,
      caption: post.caption,
      postBy: {
        username: user.username,
        profilePic: user.profilePic,
      },
      likes: post.likes || [],
      comments: post.comments || [],
    }
    setSelectedPost(postData)
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-info">
          <img
            className="profile-avatar"
            src={user.profilePic || "https://via.placeholder.com/80"}
            alt={user.username}
          />
          <div className="profile-details">
            <h2>{user.username || "Username"}</h2>
            <p className="profile-bio">{user.bio || "No bio yet."}</p>
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-number">{user.postCount || 0}</span>
                <span className="stat-label">posts</span>
              </div>
            </div>
          </div>
        </div>

        {isOwnProfile && (
          <div className="profile-actions">
            <button className="action-button" onClick={() => setShowEditForm(!showEditForm)}>
              Edit Profile
            </button>
            <button className="action-button" onClick={() => setShowPostForm(!showPostForm)}>
              New Post
            </button>
          </div>
        )}
      </div>

      {showEditForm && (
        <div className="form-section">
          <h2 className="form-title">Edit Profile</h2>
          <form onSubmit={handleUpdateSubmit}>
            <div className="profile-form">
              <input
                type="text"
                defaultValue={user?.profilePic || ""}
                name="profilePic"
                placeholder="Profile Picture URL"
                className="form-input"
              />
              <input
                defaultValue={user?.fullname || ""}
                type="text"
                placeholder="Full Name"
                name="fullname"
                className="form-input"
              />
              <input
                defaultValue={user?.username || ""}
                type="text"
                placeholder="Username"
                name="username"
                className="form-input"
              />
              <input defaultValue={user?.bio || ""} type="text" placeholder="Bio" name="bio" className="form-input" />
              <input
                defaultValue={user?.email || ""}
                type="email"
                placeholder="Email"
                name="email"
                className="form-input"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-button">
                Save Changes
              </button>
              <button type="button" onClick={() => setShowEditForm(false)} className="cancel-button">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {showPostForm && (
        <div className="form-section">
          <h2 className="form-title">Create New Post</h2>
          <form onSubmit={handlePostSubmit}>
            <div className="profile-form">
              <input
                type="text"
                placeholder="Image URL"
                name="PostImage"
                value={postImage}
                onChange={(e) => setPostImage(e.target.value)}
                className="form-input"
              />
              <input
                type="text"
                placeholder="Write a caption..."
                name="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-button">
                Share
              </button>
              <button type="button" onClick={() => setShowPostForm(false)} className="cancel-button">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post._id} className="post-item" onClick={() => handlePostClick(post)}>
            <img src={post.PostImage || "/placeholder.svg"} alt={post.caption} className="post-image" />
            <div className="post-overlay">
              <span>♥ {post.likes?.length || 0}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedPost && <PostModel postData={selectedPost} onClose={() => setSelectedPost(null)} />}
    </div>
  )
}
