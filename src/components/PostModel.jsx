import "../styles/PostModel.css"

export default function PostModel({ postData, onClose }) {
  return (
    <div className="post-modal-overlay" onClick={onClose}>
      <div className="post-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <img
            className="modal-user-avatar"
            src={postData?.postBy?.profilePic || "https://via.placeholder.com/32"}
            alt={postData?.postBy?.username}
          />
          <span className="modal-username">{postData?.postBy?.username || "Anonymous"}</span>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <img className="modal-image" src={postData.postImage || "/placeholder.svg"} alt={postData.caption} />

        <div className="modal-content">
          <p className="modal-caption">
            <strong>{postData?.postBy?.username || "Anonymous"}</strong> {postData.caption}
          </p>

          <div className="modal-stats">
            <div className="stat-item">
              <span>♥</span>
              <span className="stat-number">{postData.likes?.length || 0}</span>
              <span>likes</span>
            </div>
            <div className="stat-item">
              <span>💬</span>
              <span className="stat-number">{postData.comments?.length || 0}</span>
              <span>comments</span>
            </div>
          </div>

          <div className="comments-section">
            {postData.comments?.length > 0 ? (
              postData.comments.map((comment, index) => (
                <div key={index} className="comment-item">
                  <div className="comment-user">{comment.user?.username || "User"}</div>
                  <div className="comment-text">{comment.comment}</div>
                  <div className="comment-time">2h</div>
                </div>
              ))
            ) : (
              <p style={{ color: "#8e8e8e", fontSize: "14px" }}>No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
