import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import coverpic from "../../Assets/dummy-image-landscape.jpg";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Actions/Users";
import axios from "axios";

const Right_Sec = ({ posts, loggedUser,myPost }) => {
  const [active, setActive] = useState(false);
  const [profile, setProfile] = useState("");
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getUserByUsername = async () => {
      const userProfile = await axios.get(
        `https://a-socials-server-jny7w6fuh-aabidkhan0786.vercel.app/aak/user/find?username=${loggedUser.user.username}`
      );
      setProfile(userProfile.data);
    };
    getUserByUsername();
  }, [loggedUser, location]);


  return (
    <div className="">
      <div className="glass details_cover">
        <i className="fa-solid fa-earth-asia icon_size" onClick={()=>alert("feature yet to add")} ></i>
        <Link
          to={`profile/${loggedUser.user.username}`}
          state={{ data: loggedUser.user, myPosts: myPost.length }}
        >
          <i
            className="fa-regular fa-id-card icon_size"
            onClick={() => setActive(true)}
          ></i>
        </Link>
        <i class="fa-regular fa-message icon_size" onClick={()=>alert("feature yet to add")} ></i>
        <i
          className="fa-solid fa-arrow-right-from-bracket icon_size"
          style={{ cursor: "pointer" }}
          onClick={() => dispatch(logout(history))}
        ></i>
      </div>
      <hr />

      <div className="glass user_cover right_sec_div">
        {loggedUser.user ? (
          <Link
            to={`profile/${loggedUser.user.username}`}
            state={{ data: loggedUser.user, myPosts: myPost.length }}
          >
            {profile ? (
              <>
                <div className="">
                  <div className="d-flex justify-content-center" >

                  {profile.coverpicture ? (
                    <img
                      src={profile.coverpicture}
                      alt="coverpic"
                      className="img-fluid"
                      loading="lazy"
                      style={{ borderRadius: "10px",height:"130px" }}
                    />
                  ) : (
                    <img
                      src={coverpic}
                      alt="coverpic"
                      style={{ borderRadius: "10px",height:"130px" }}
                      className="img-fluid"
                      loading="lazy"                    
                    />
                  )}
                  </div>
                  <div className="profile_small">
                    {profile.profilepicture ? (
                      <img
                        src={profile.profilepicture}
                        style={{ width: "80px", borderRadius: "50%" }}
                        loading="lazy"
                        alt="profile pic"
                      />
                    ) : (
                      <Avatar size="80" round={true} name={profile.username} />
                    )}
                  </div>
                  <div className="mt-3">
                    <p className="px-2 text-capitalize">
                      <i class="fa-solid fa-user"></i>
                      {profile.username}
                    </p>
                    <p className="px-2">
                      <i class="fa-solid fa-at"></i>
                      {profile.email}
                    </p>
                    <p className="px-2 text-capitalize">
                      <i class="fa-solid fa-location-dot"></i>
                      {profile.city}
                    </p>
                    <p className="px-2 text-capitalize">
                      <blockquote class="blockquote">
                        <footer class="blockquote-footer">
                          {profile.desc}
                        </footer>
                      </blockquote>
                    </p>
                    {/* posts,followers & followings */}

                    <div className="sub_right_sec pt-2">
                      <p className="">Posts:{myPost.length}</p>
                      <p>
                        Followers:
                        {profile?.followers?.length > 0
                          ? profile?.followers?.length
                          : "0"}
                      </p>
                      <p>
                        Followings:
                        {profile?.followings?.length > 0
                          ? profile?.followings?.length
                          : "0"}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                          <div
            class="card glass"
            style={{ background: "transparent" }}
            aria-hidden="true"
          >
            <img src="..." class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title placeholder-glow">
                <span class="placeholder col-6"></span>
              </h5>
              <p class="card-text placeholder-glow">
                <span class="placeholder col-7"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-6"></span>
                <span class="placeholder col-8"></span>
              </p>
              <button
                class="btn btn-primary disabled placeholder col-6 "
                aria-disabled="true"
              ></button>
            </div>
          </div>
              </>
            )}
          </Link>
        ) : (
          <div
            class="card glass"
            style={{ background: "transparent" }}
            aria-hidden="true"
          >
            <img src="..." class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title placeholder-glow">
                <span class="placeholder col-6"></span>
              </h5>
              <p class="card-text placeholder-glow">
                <span class="placeholder col-7"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-6"></span>
                <span class="placeholder col-8"></span>
              </p>
              <button
                class="btn btn-primary disabled placeholder col-6 "
                aria-disabled="true"
              ></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Right_Sec;
