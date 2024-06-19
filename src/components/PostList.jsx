import Post from "./Post";
import { PostList } from "../store/Post-List-Store";
import { useContext } from "react";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinnner from "./LoadingSpinner";

const PostListItem = () => {
  const { postList, fetching } = useContext(PostList);
  // Calls postlist that is array of object that contains all post.
  // Fetching is useState in store, used for loader check
  // Called using Context hook

  return (
    <>
      {fetching === "true" && <LoadingSpinnner />}
      {fetching === "false" && postList.length === 0 && <WelcomeMessage />}
      {fetching === "false" &&
        postList.map((post) => <Post key={post.id} post={post} />)}
      {/* Takes out each obj from array using map and passed to post component */}
    </>
  );
};

export default PostListItem;
