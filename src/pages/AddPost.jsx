import React from "react";

export default function AddPost() {
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    
    formData.append("caption",e.target.caption.value);
    formData.append("postImage",e.target.postImage.files[0]);
    formData.append("postBy",e.target.postBy.value);

    try{
        const res = await axios.post("http://localhost:5500/api/posts/",formData , {
            header : {
                 "Content-Type": "multipart/form-data"
            }
        });

      console.log("Post added:", res.data);
      alert("Post created successfully!");

    }catch(err){
      console.error("Error uploading post:", err);
      alert("Failed to create post");
    }
  }

  return (
    <div>
      <form onClick={handleSubmit} encType="multipart/form-data">
        <br />
        <input
          type="text"
          placeholder="Enter post caption"
          name="caption"
          required
        />
        <br />
        <br />
        <input type="file" name="postImage" accept="image/*" required />

        <br />
        <br />
        <input type="text" placeholder="Author" name="postBy" required />

        <br />
        <br />
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
}
