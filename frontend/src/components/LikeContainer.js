import "./LikeContainer.css";

import { BsHeart, BsHeartFill } from "react-icons/bs";

const LikeContainer = ({ post, user, handleLike }) => {
  return (
    <div className="like">
      {post.likes && user && (
        <>
          {post.likes.includes(user._id) ? (
            <BsHeartFill />
          ) : (
            <BsHeart onClick={() => handleLike(post)} />
          )}
          <p>{post.likes.length} like(s)</p>
        </>
      )}
    </div>
  );
};

export default LikeContainer;
