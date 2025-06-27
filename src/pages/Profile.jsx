import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


export default function Profile({ UserData }) {
   let Data = JSON.parse(localStorage.getItem("User"));

  const { userId } = useParams(); // dynamic userId from route
  const currentUserId = Data?._id;

  const isOwnProfile = !userId || userId === currentUserId;
  const effectiveUserId = userId || currentUserId;

  console.log({
  userId,
  currentUserId,
  effectiveUserId,
  isOwnProfile,
});


  let [posts, setAllPosts] = useState([]);
  let [user,setUser] = useState([]);
  let [ProfileUpdating, setProfileUpdating] = useState(false);
  let [showEditForm, setShowEditForm] = useState(false);
  let [showPostForm, setShowPostForm] = useState(false);
  const [postImage, setPostImage] = useState("");
  const [caption, setCaption] = useState("");
  


  useEffect(() => {
    if (!effectiveUserId) return; // agar user data available nahi hai toh API call mat karo

    async function getUserPosts() {
       let Data = JSON.parse(localStorage.getItem("User"));
       console.log(Data._id);
      const post = await axios.get(
        `http://localhost:5500/api/posts/postBy/${effectiveUserId}`
      ,{
          headers:{
             Authorization: `${JSON.parse(localStorage.getItem("User")).token}`,
          },
        });

      setAllPosts(post.data);
      console.log(post.data, "ye console aaya posts mangne pr");
    }
    getUserPosts();
  }, [effectiveUserId, ProfileUpdating]);

  async function handleUpdateSubmit(e){
        e.preventDefault();
         setProfileUpdating(true);
       
        let res = await axios.put(`http://localhost:5500/api/users/update/${UserData._id}`,
        {
           
                profilePic: e.target.profilePic.value,
                fullname: e.target.fullname.value,
                username: e.target.username.value,
                bio: e.target.bio.value,
                email: e.target.email.value,
            
        },{
          headers:{
             Authorization: `${JSON.parse(localStorage.getItem("User")).token}`,
          },
        });
   
         if(res.status == 200) {
            console.log(res.data)
            setShowEditForm(false);
        } else {
            console.log(res.data)
        } 
         setProfileUpdating(false);
  }
 
  async function handlePostSubmit(e) {
    e.preventDefault();
    setProfileUpdating(true);

    let PostImage = e.target.PostImage.value;
    let caption = e.target.caption.value;
     let postBy = UserData._id;

    let res = await axios.post("http://localhost:5500/api/posts", {
      PostImage,
      caption,
      postBy,
    },{
          headers:{
             Authorization: `${JSON.parse(localStorage.getItem("User")).token}`,
          },
        });

    if (res.status == 200) {
      console.log(res.data,"profile ke handle submit ka console");
    } else {
      console.log(res.data);
    }

      setTimeout(() => { 
            setProfileUpdating(false);
        }, 2000);
    setPostImage("");
    setCaption("");
  }

  useEffect(()=>{
    async function BandeKiProfileKaInfo() {
      
      const userInfo = await axios.get(`http://localhost:5500/api/users/${effectiveUserId}`);
      setUser(userInfo.data);
      console.log(userInfo.data,"bandekiprofileka console hai");
    }

     BandeKiProfileKaInfo();
  },[effectiveUserId, ProfileUpdating]);

  return (
    <div>
      <div>

      <centre>
        <h2>{user.username}</h2>
      </centre>
      {/* SHOW all Data */}
      <img height={100} src={user.profilePic} alt="" />
      <p>{user.bio || "bio goes here..."}</p>
      <p>Post Count: {user.postCount}</p>
      </div>
      {isOwnProfile && (
      <div>
        <button onClick={() => setShowEditForm(!showEditForm)}>Edit profile</button>
       <button onClick={() => setShowPostForm(!showPostForm)}>Share post</button>
      </div>
      )}

       <br/>
      <hr />
      {showEditForm && (
        <div>
        <h2 >Edit Profile</h2>
        <form onSubmit={handleUpdateSubmit}>
          <input type="text" 
           defaultValue={user?.profilePic || ''} 
           name="profilePic"
           placeholder="Profile Pic URL" />
             <br/>
           <input
              defaultValue={user?.fullname || ''} 
              type="text" 
              placeholder="Full Name"  
              name="fullname"/>
                <br/>
            <input 
            defaultValue={user?.username || ''} 
            type="text" 
            placeholder="user Name"
            name="username"/> 
              <br/> 
               <input 
            defaultValue={user?.bio || ''} 
            type="text" 
            placeholder="user bio"
            name="bio"/> 
              <br/> 
            <input 
              defaultValue={user?.email || ''} 
              type="email" 
              placeholder="Email" 
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              />
                <br/>
              <button 
                type="submit"
                className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
               >
                Update
              </button>
               <button 
                type="button"
                onClick={() => setShowEditForm(false)}
                className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
        </form>
        <br/>
        </div>
      )}

      {showPostForm && (
      <div>
        <h2>Share Post</h2>
      <form onSubmit={handlePostSubmit}>
        <input type="text" 
        placeholder="PostImg" 
        name="PostImage" 
        value={postImage}
        onChange={(e) => setPostImage(e.target.value)} />
        <br/>
        <input type="text" 
        placeholder="Caption" 
        name="caption"
        value={caption} 
        onChange={(e) => setCaption(e.target.value)}/>
        <br/>
        <button type="submit">Post</button>
        <button  type="button" onClick={() => setShowPostForm(false)} >Cancel</button>
        
      </form>
  
      </div>
      )}
      
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
