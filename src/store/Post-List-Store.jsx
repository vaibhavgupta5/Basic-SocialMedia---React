import { createContext, useEffect, useReducer, useState } from "react";

// This is store which stores everything as context and can be used by any components.
// States are only used inside components, func!

export const PostList = createContext({
  //Defining func and arrays that are to be used as context
  postList: [],
  addPost: () => {},
  deletePost: () => {},
  fetching: false,
});

const postListReducer = (currPostList, action) => {
  //This is reducer func, that takes out current postlists and updation add delete all mal masala occurs here.
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter((post) => post.id !== action.payload); // If delete than filters out that one post with that id
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList]; //when added adds thing in front.. {...currPostList faila deta h array ko}
  } else if (action.type === "UPDATE_POST") {
    //This whole thing is just to update reactions
    const postToUpdate = currPostList.find(
      //Takes out obj with same id from whole array using find
      (post) => post.id === action.payload
    );

    let tempPostList = currPostList.filter(
      //Filtered out rest array to which will add updated obj
      (post) => post.id !== action.payload
    );

    if (postToUpdate) {
      const updatedPost = {
        ...postToUpdate,
        reactions: {
          ...postToUpdate.reactions,
          likes: Number(postToUpdate.reactions.likes) + 1,
        },
      };

      newPostList = [updatedPost, ...tempPostList];
      console.log(updatedPost);
    }
  } else if (action.type === "ADD_INITIAL_POST") {
    //Add posts from API call
    newPostList = action.payload;
  }

  return newPostList; //returns means repaints postlist that is changed.
};

const PostListProvider = ({ children }) => {
  //PostListProvider takes out all postlists
  const [postList, dispatchPostList] = useReducer(postListReducer, []); //making reducer func
  const [fetching, setFetching] = useState("true");
  const [hasFetched, setHasFetched] = useState(false);

  const addPost = (post) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: post,
    }); //dispatchPostList dispaces the data and payload is data needed for upldatation etc
  };

  const addInitialPost = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POST",
      payload: posts,
    });
  };

  const deletePost = (id) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: id,
    });
  };

  const updateReaction = (id) => {
    dispatchPostList({
      type: "UPDATE_POST",
      payload: id,
    });
  };

  //Use effect is a func that calls api as soon as work is done , in this case window load
  useEffect(() => {
    if (!hasFetched) {
      setFetching("true"); //This is needed for showing up loader

      const controller = new AbortController(); //To aport and save data when not in use
      const signal = controller.signal;

      fetch("https://dummyjson.com/posts", { signal })
        .then((res) => res.json())
        .then((data) => {
          addInitialPost(data.posts);
          setFetching("false");
          setHasFetched(true);
        });

      return () => {
        controller.abort(); //To aport and save data when not in use
      };
    }
  }, [hasFetched, addInitialPost]);

  return (
    <PostList.Provider
      value={{ postList, addPost, deletePost, updateReaction, fetching }}
    >
      {/* //pases values so that anyone can be called in any components */}
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
