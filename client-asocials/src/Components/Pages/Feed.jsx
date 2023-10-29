import React, { useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import { useDispatch, useSelector } from "react-redux";
import { findUser } from "../../Redux/Actions/Users";
import { deletePost, likePost, updatePost } from "../../Redux/Actions/Posts";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import axios from "axios";
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const Feed = ({ p, loggedUser }) => {
  const [menu, setMenu] = useState(false);
  // const users = useSelector((state) => state.Users);
  const dispatch = useDispatch();
  const [postUser, setPostUser] = useState([]);
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);
  const [caption, setCaption] = useState(p.desc);


  useEffect(() => {
    const findPostUser = async () => {
      const res = await axios.get(`aak/user/find?userId=${p.userId}`);
      setPostUser(res.data);
    };
    findPostUser();
  }, []);

  const handleUpdate = (e, postId) => {
    e.preventDefault();
    console.log({ postId });
    const updateDetails = {
      desc: caption,
    };
    dispatch(updatePost(postId, updateDetails));
    setEdit(false);
  };
  return (
    <div className="glass post_cover">
      <div className="d-flex justify-content-between p-2 ">
        <Link to={`profile/${p.username}`}>
          <div className="d-flex profile_tags justify-content-center place-items-center">
            {postUser.profilepicture ? (
              <img
                src={postUser.profilepicture}
                style={{ width: "40px", borderRadius: "50%" }}
                loading="lazy"
                alt="profile pic"
              />
            ) : (
              <Avatar size="40" round={true} name={postUser.username} />
            )}
            <p className="text-capitalize pt-2 px-2">{p.username}</p>
          </div>
        </Link>
        <div>
          <ReactTimeAgo date={p.createdAt} />
        </div>
      </div>
      <div>
        {p.img === "" ? (
          ""
        ) : (
          <img
            src={p.img}
            alt="pics"
            loading="lazy"
            className="img-fluid p-1"
          />
        )}
      </div>
      {edit ? (
        <>
          <input
            type="text"
            className="input_search ms-2 px-1"
            style={{ width: "90%" }}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <button
            className="btn btn-sm mb-2"
            onClick={(e) => handleUpdate(e, p._id)}
          >
            <i class="fa-solid fa-pencil"></i>
          </button>
        </>
      ) : (
        <p className="px-2">{p.desc}</p>
      )}

      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex">
          {p.likes.includes(loggedUser.user._id) ? (
            <i
              class="fa-solid fa-heart p-2"
              style={{ fontSize: "25px", color: "hotpink" }}
              onClick={() => dispatch(likePost(p._id, loggedUser.user.userId))}
            ></i>
          ) : (
            <i
              class="fa-regular fa-heart p-2"
              style={{ fontSize: "25px" }}
              onClick={() => dispatch(likePost(p._id, loggedUser.user.userId))}
            ></i>
          )}

          <p className="py-2">
            {p.likes.length
              ? p.likes.length > 1
                ? `${p.likes.length} likes`
                : `${p.likes.length} like`
              : ""}
          </p>
          {/* <i class="fa-regular fa-comment-dots"></i> */}
        </div>
        {loggedUser.user._id === p.userId ? (
          <>
            <div className="">
              <button className="m-2 btn btn-sm ">
                {edit ? (
                  <i
                    class="fa-solid fa-xmark"
                    onClick={() => setEdit(false)}
                  ></i>
                ) : (
                  <i
                    class="fa-solid fa-pen-to-square"
                    onClick={() => setEdit(true)}
                  ></i>
                )}
              </button>
              <button className="m-2 btn btn-sm " onClick={()=>setDel(true)} >
                <i class="fa-solid fa-trash-can"  ></i>
              </button>
              {del &&
                <div className="flying_toast glass flex-column" >
                  <p className="px-2 text-center">             
                    Are you sure, want to delete ?
                    </p>
                    <div  className="d-flex justify-content-between px-4" >
                  <button className="btn btn-sm" onClick={()=>dispatch(deletePost(p._id))} ><i class="fa-solid fa-trash-can-arrow-up"></i></button>
                  <button className="btn btn-sm" onClick={()=>setDel(false)} ><i class="fa-solid fa-ban"></i></button>
                  </div>
                </div>}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Feed;
