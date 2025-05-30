import react, { useState , useEffect } from "react";
import axios from "axios";

export default function Explore(){

    let [AllPost,setAllPost] = useState([]);

    useEffect(()=>{
     
        async function GetAllPost(){

         
                let res = await axios.get("http://localhost:5500/api/posts");
                console.log("API Response:", res.data);
                if(res.status == 200){

                    setAllPost(res.data.posts);

                }
                else
                {
                    console.log(res.data.posts);
                }
        }

        GetAllPost();
    },[]);

    return(
          <div>
        {
            AllPost.map((post)=>{
                return(
                    <div>
                        <img height={100} src={post.PostImage} />
                        <p>{post.caption}</p>
                    </div>
                )
            })
        }
    </div>

    )
}