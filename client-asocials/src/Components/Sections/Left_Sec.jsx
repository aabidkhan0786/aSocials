import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  followUser,
  getAllUsers,
  unFollowUser,
} from "../../Redux/Actions/Users";
import Avatar from "react-avatar";
import axios from "axios";
import { Link } from "react-router-dom";

const Left_Sec = ({ loggedUser,myPost }) => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    const getAllUser = async () => {
      const user = await axios.get("https://a-socials-server-jny7w6fuh-aabidkhan0786.vercel.app/aak/user");
      setUser(user.data);
    };
    getAllUser();
  }, []);

  const handleFollow = async (e, id) => {
    e.preventDefault();
    const res = await axios.put(`https://a-socials-server-jny7w6fuh-aabidkhan0786.vercel.app/aak/user/${id}/follow`, {
      userId: loggedUser.user._id,
    });
    dispatch(followUser(id));
  };
  const handleUnfollow = async (e, id) => {
    e.preventDefault();
    const res = await axios.put(`https://a-socials-server-jny7w6fuh-aabidkhan0786.vercel.app/aak/user/${id}/unfollow`, {
      userId: loggedUser.user._id,
    });
    dispatch(unFollowUser(id));
  };

  const searchFriends = () => {
    console.log(search);
    alert("feature yet to add")
  };

  return (
    <div>
      <div className="glass search_cover">
        <input
          type="search"
          placeholder={`Search friends`}
          className="input_search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <i class="fa-solid fa-magnifying-glass" onClick={searchFriends}></i>
      </div>
      <hr />
      <div className="glass user_cover left_sec_div">
        <h5 className="p-2 text-underline title">Available Users:</h5>
        {user.length ? (
          <>
            {user.map((u) => (
              <>
                <div className="d-flex p-2 d-flex justify-content-between">
                  <Link to={`profile/${u.username}`} state={{data:loggedUser.user}}>
                    <div className="d-flex">
                      {u.profilepicture ? (
                        <img
                          src={u.profilepicture}
                          style={{ width: "35px", borderRadius: "50%" }}
                          loading="lazy"
                          alt="profile pic"
                          className="img-fluid"
                        />
                      ) : (
                        <Avatar size="35" round={true} name={u.username} />
                      )}

                      <p className="mx-2">{u.username}</p>
                    </div>
                  </Link>
                  {u._id !== loggedUser.user._id ? (
                    loggedUser.user.followings?.includes(u?._id) ? (
                      <button
                        className="btn"
                        onClick={(e) => handleUnfollow(e, u._id)}
                      >
                        <i class="fa-solid fa-user-minus"></i>
                      </button>
                    ) : (
                      <button
                        className="btn"
                        onClick={(e) => handleFollow(e, u._id)}
                      >
                        <i class="fa-solid fa-user-plus"></i>
                      </button>
                    )
                  ) : (
                    <>
                      <Link
                        className="btn mt-1"
                        to={`profile/${loggedUser.user.username}`}
                        state={{ data: loggedUser.user, myPosts: myPost.length }}
                      >
                        <i className="fa-regular fa-id-card icon_size"></i>
                      </Link>
                    </>
                  )}
                </div>
              </>
            ))}
          </>
        ) : (
          <p class="placeholder-glow ">
            <span class="placeholder col-12"></span>
            <span class="placeholder col-12 placeholder-lg"></span>
            <span class="placeholder col-12"></span>
            <span class="placeholder col-12 placeholder-sm"></span>
            <span class="placeholder col-12 placeholder-xs"></span>
            <span class="placeholder col-12"></span>
            <span class="placeholder col-12 placeholder-lg"></span>
            <span class="placeholder col-12"></span>
            <span class="placeholder col-12 placeholder-sm"></span>
            <span class="placeholder col-12 placeholder-xs"></span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Left_Sec;
