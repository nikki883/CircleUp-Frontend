import react from "react";

export default function PostModel({postData}){
    return(
        <div>
            <div>
           <h3>{postData.postBy.username}</h3>
           <img src={postData.postImage} alt=""/>
           <p>{postData.caption}</p>
           <p>likes :</p>
            </div>
           <div>
            <p>comments</p>
           </div>
        </div>
    )
}