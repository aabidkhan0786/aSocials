import React, { useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPosts, getMyTimeline } from "../Redux/Actions/Posts";
import Left_Sec from "./Sections/Left_Sec";
import Middle_Sec from "./Sections/Middle_Sec";
import Right_Sec from "./Sections/Right_Sec";
import { findUser } from "../Redux/Actions/Users";
import { useLocation, useNavigate } from "react-router-dom";


const Home = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.Post);
  const loggedUser = useSelector((state) => state.Auth);
  const authUser = JSON.parse(localStorage.getItem("Profile"));
  const [posts, setPosts] = useState([])
  const [myPost, setMyPost] = useState([]);
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getMyTimeline(authUser.user._id))
  }, [dispatch, location]);

  useEffect(() => {
    const sortPost = () => {
      if (post) {
        setPosts(
          post.sort((post1, post2) => {
            return new Date(post2.createdAt) - new Date(post1.createdAt)
          }))
      }
    }
    sortPost()
  }, [post])

  useEffect(() => {
    console.log(posts);
    if (posts) {
      const getMyposts = () => {
        setMyPost(posts.filter((p) => p.userId === loggedUser.user._id));
      };
      getMyposts();
    }
  }, [posts]);



  console.log({ after_state: loggedUser });
  console.log({ after_state_post: posts });

  return (
    <>
      <div className="home_bg scrollbar">
        <div className="d-flex">
          {/* left sidebar */}
          <div className="left_sec">
            <Left_Sec loggedUser={loggedUser} myPost={myPost} />
          </div>

          {/* middle sidebar */}
          <div className="mid_sec">
            <Middle_Sec posts={posts} loggedUser={loggedUser} myPost={myPost} />
          </div>

          {/* right sidebar */}
          <div className="right_sec">
            <Right_Sec posts={posts} loggedUser={loggedUser} myPost={myPost} />
          </div>
        </div>

        {/* footer */}
        <nav class="navbar footer glass fixed-bottom ">
          <div class="container-fluid d-flex justify-content-center mb-2  footer_cover">
            <p className="glow glass logo">aSoci@ls</p>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Home;