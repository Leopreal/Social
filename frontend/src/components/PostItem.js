import "./PostItem.css";

import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
  return (
    <div className="post-item">
      <h2>{post.title}</h2>
      <h4>{post.post}</h4>
      <p className="post-author">
        Publicada por:<Link to={`/users/${post.userId}`}> {post.userName}</Link>
      </p>
    </div>
  );
};

export default PostItem;
