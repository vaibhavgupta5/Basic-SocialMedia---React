import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
// import CreatePost from "./components/CreatePost";
// import PostList from "./components/PostList";
// import { useState } from "react";
import PostListProvider from "./store/Post-List-Store";
import { Outlet } from "react-router-dom";
function App() {
  // const [selectedTab, setSelectedTab] = useState("Home");

  return (
    <PostListProvider>
      <div className="appContainer">
        <Sidebar />
        <div className="content">
          <Header />
          {/* { selectedTab === "Home" ? ( <div className="main-container"><PostList/></div>) : (<CreatePost/> )} */}
          <Outlet />
          {/* This imports content form router "Outlet" */}
          <Footer />
        </div>
      </div>
    </PostListProvider>
  );
}

// Comented things were used before adding router.. Now router controls

export default App;
