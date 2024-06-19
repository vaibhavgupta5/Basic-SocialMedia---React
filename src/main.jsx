import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CreatePost from "./components/CreatePost.jsx";
import PostList from "./components/PostList";

// CreateBrowserRouter us used in navigation and page loading contains elements inside it.
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [ //PASED AS ARRAY
      {
        path: "/",
        element: (
          <div className="main-container">
            <PostList />
          </div>
        ),
      },
      { path: "/create-post", element: <CreatePost /> },
    ], // Childeren makes elemt like postList and CreatePost inside App
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* React Router, App and other elemnets come inside it*/}
  </React.StrictMode> // React Scrict just is for checking ,,, repaints everything 2 times, Is not included in Build
);
