import { useNavigate } from "react-router-dom";
import { PostList } from "../store/Post-List-Store";
import styles from "./CreatePost.module.css"; // Assinged modular css just for learning

import { useContext, useRef } from "react";

const CreatePost = () => {
  const navigate = useNavigate();
  const { addPost } = useContext(PostList); //Taking out addPost func from Store

  // Use ref is just like assinging value to any variable.. It takes out data from current Postlist

  // Defining then as Ref func
  const userIdRef = useRef();
  const titleRef = useRef();
  const bodyRef = useRef();
  const reactionsRef = useRef();
  const tagsRef = useRef();

  // Defining handleSubmit func
  const handleSubmit = (event) => {
    event.preventDefault();

    //Values are passed from form to these variables
    const userId = userIdRef.current.value;
    const title = titleRef.current.value;
    const body = bodyRef.current.value;
    const reactions = reactionsRef.current.value;
    const tags = tagsRef.current.value.split(" ");

    //Clearing the form after submit
    userIdRef.current.value = "";
    titleRef.current.value = "";
    bodyRef.current.value = "";
    reactionsRef.current.value = "";
    tagsRef.current.value = "";

    //Adding data to API
    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // Just like meta in HTML, used to tell what to do

      //Body is defined by us what we want to add

      body: JSON.stringify({
        title: title,
        body: body,
        reactions: {
          likes: reactions,
        },
        userId: userId,
        tags: tags,
      }),
    })
      .then((res) => res.json())
      .then((post) => {
        addPost(post); //Once 200 then addPost func is passed the obj to create
      }, navigate("/"));
  };

  return (
    <form className={styles.createPost} onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label myLabel">
          User Id (Between 1-100)
        </label>
        <input
          type="text"
          ref={userIdRef}
          className="form-control"
          id="userId"
          placeholder="Please tell us your UserId"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="title" className="form-label myLabel">
          Post Title
        </label>
        <input
          type="text"
          ref={titleRef}
          className="form-control"
          id="title"
          placeholder="How are you feeling today?..."
        />
      </div>

      <div className="mb-3">
        <label htmlFor="body" className="form-label myLabel">
          Post Description
        </label>
        <textarea
          type="text"
          rows={4}
          ref={bodyRef}
          className="form-control"
          id="body"
          placeholder="Tell more about you..."
        />
      </div>

      <div className="mb-3">
        <label htmlFor="reactions" className="form-label myLabel">
          Post Reactions
        </label>
        <input
          type="text"
          ref={reactionsRef}
          className="form-control"
          id="reactions"
          placeholder="How many reacted with this...?"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="tags" className="form-label myLabel">
          Post Tags
        </label>
        <input
          type="text"
          ref={tagsRef}
          className="form-control"
          id="tags"
          placeholder="Enter multiple tags with spaces..."
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
};

export default CreatePost;
