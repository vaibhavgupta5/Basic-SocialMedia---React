import { ImCross } from "react-icons/im";
import { FaHeart } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { useContext } from "react";
import { PostList } from "../store/Post-List-Store";

//This is modal post imported design from bootstrap

const Post = ({ post }) => {
  //post is passed as prop which comes form submit of form or api call
  const { deletePost, updateReaction } = useContext(PostList);

  return (
    <div className="card post-card" style={{ width: "45%" }}>
      <div className="card-body">
        <h5 className="card-title">
          {post.title}
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger cross-btn"
            onClick={() => deletePost(post.id)}
          >
            <ImCross className="ImCross" />
          </span>{" "}
        </h5>
        <p className="card-text post-body">{post.body}</p>

        {post.tags.map(
          (
            tag //takes each element(tag) from tags array
          ) => (
            <span key={tag} className="badge text-bg-primary tags">
              {tag}
            </span>
          )
        )}

        {/* <span className="badge text-bg-primary tags">
            hgh
          </span> */}

        <div className="alert alert-success reaction-bar" role="alert">
          <div>
            Rections <FaHeart className="FaHeart" />
            <strong>{post.reactions.likes}</strong>
          </div>
          <div onClick={() => updateReaction(post.id)}>
            <FaPlusCircle className="FaPlusCircle" />
            {/* To update reaction count on click updateReaction is called */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

//id,title,body ,reactions,tags
