import React, { useEffect, useState } from "react";
import coverpic from "../../Assets/dummy-image-landscape.jpg";
import Avatar from "react-avatar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import CryptoJS from "crypto-js";
import { updateUser } from "../../Redux/Actions/Users";
import { Tooltip } from "react-tooltip";

const MyProfile = () => {
  const [profile, setProfile] = useState([]);
  const dispatch = useDispatch();
  const { username } = useParams();
  const location = useLocation();
  const data = location.state;
  const [edit, setEdit] = useState(false);
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");
  const [loc, setLoc] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [coverPic, setCoverPic] = useState("");
  const navigate = useNavigate();
  const [picName, setPicName] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const getUserByUsername = async () => {
      const userProfile = await axios.get(
        `https://a-socials-server-jny7w6fuh-aabidkhan0786.vercel.app/aak/user/find?username=${username}`
      );
      console.log(userProfile);
      setProfile(userProfile);
      setEmail(userProfile.data.email);
      setDesc(userProfile.data.desc);
      setLoc(userProfile.data.city);
      unHasedPassword(userProfile.data.password);
      setProfilePic(userProfile.data.profilepicture);
      setCoverPic(userProfile.data.coverpicture);
    };
    getUserByUsername();
  }, []);

  const unHasedPassword = (hashPassword) => {
    const hashedpass = CryptoJS.AES.decrypt(hashPassword, "aabid0204");
    const password = hashedpass.toString(CryptoJS.enc.Utf8);
    setPassword(password);
  };

  const convertBase64 = (e, type) => {
    e.preventDefault();
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    setPicName(e.target.files[0].name);
    setType(type);
    if (type === "cover") {
      reader.onload = () => {
        setCoverPic(reader.result);
      };
    } else {
      reader.onload = () => {
        setProfilePic(reader.result);
      };
    }
    reader.onerror = (error) => {
      console.log(error);
    };
  };

  const handleEdit = () => {
    const updateDetails = {
      email,
      city: loc,
      password,
      desc,
      profilepicture: profilePic,
      coverpicture: coverPic,
    };
    dispatch(updateUser(profile.data._id, updateDetails));
    navigate(`/auth`);
  };

  console.log({ data, profile });
  return (
    <>
      <div className="profile_section">
        {picName && (
          <>
            <div className="hover_div glass">
              <div className="d-flex justify-content-between p-2">
                <div>
                  <p>Preview:</p>
                  <p className="px-2">{picName && picName}</p>
                </div>
                <div className="">
                  <button className="btn mx-2" onClick={handleEdit}>
                    <i className="fa-solid fa-image-portrait"></i>
                  </button>
                  <button className="btn" onClick={() => setPicName("")}>
                    <i className="fa-solid fa-ban"></i>
                  </button>
                </div>
              </div>
              <div className="d-flex justify-content-center w-100 h-100">
                <img
                  src={type === "profile" ? profilePic : coverPic}
                  className="w-75 img-fluid h-75"
                  alt="preview"
                />
              </div>
            </div>
          </>
        )}
        <div className="glass profile_cover">
          {!edit ? (
            <>
              {profile.data ? (
                <>
                  {/* cover & profile pic */}
                  <div className="cover_profile" style={{ cursor: "pointer" }}>

                      <label
                        htmlFor={data?.data._id === profile?.data._id ? "cover_pic" : ""}
                        className="btn_neutral"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={data?.data._id === profile?.data._id ? "Click to change Cover Picture!" : ""}                        
                        style={{ cursor: "pointer" }}
                      >

                      <input
                        type="file"
                        id="cover_pic"
                        className="d-none"
                        onChange={(e) => convertBase64(e, "cover")}
                      />
                      {profile.data.coverpicture ? (
                        <img
                          src={profile.data.coverpicture}
                          alt="coverpic"
                          className="coverpic img-fluid"
                          loading="lazy"
                        />
                      ) : (
                        <img
                          src={coverpic}
                          alt="coverpic"
                          className="coverpic img-fluid"
                          loading="lazy"
                        />
                      )}
                    </label>
                    <div className="profilepic">
                      <label
                        htmlFor={data?.data._id === profile?.data._id ? "profile_pic" : ""}
                        className="btn_neutral"
                        data-tooltip-id="my-tooltip-picture"
                        data-tooltip-content={data?.data._id === profile?.data._id ? "Click to change Picture!" : ""}                        
                        style={{ cursor: "pointer" }}
                      >
                        <input
                          type="file"
                          id="profile_pic"
                          className="d-none"
                          onChange={(e) => convertBase64(e, "profile")}
                        />
                        {profile.data.profilepicture ? (
                          <img
                            src={profile.data.profilepicture}
                            style={{ width: "200px", borderRadius: "50%" }}
                            alt="profile pic"
                            loading="lazy"
                            className="hover_img"
                          />
                        ) : (
                          <Avatar
                            size="200"
                            round={true}
                            name={profile.data.username}
                          />
                        )}
                      </label>
                    </div>
                  </div>
                  {/* profile details */}
                  <div className="profile_details">
                    <div className="d-flex justify-content-between">
                      <div className="">
                        <p className="px-2 text-capitalize">
                          <i className="fa-solid fa-user"></i>
                          {profile.data.username}
                        </p>
                        <p className="px-2">
                          <i className="fa-solid fa-at"></i>
                          {profile.data.email}
                        </p>
                        <p className="px-2 text-capitalize">
                          <i className="fa-solid fa-location-dot"></i>
                          {profile.data.city}
                        </p>
                      </div>
                      <div className="mt-3 ">
                        <blockquote className="blockquote">
                          <footer className="blockquote-footer">
                            {profile.data.desc}
                          </footer>
                        </blockquote>
                      </div>
                    </div>
                    {data !== null ? (
                      data?.data._id === profile?.data._id ? (
                        <div className="btns ms-auto">
                          <button className="btn" onClick={() => setEdit(true)}>
                            <i className="fa-solid fa-user-pen"></i>
                          </button>
                        </div>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>

                  {/* posts,followers & followings */}
                  <div className="sub_sec">
                    <div className="sub_profile pt-2">
                      <p className="width_posts">Posts:{data.myPosts}</p>
                      <p>
                        Followers:
                        {profile.data.followers.length > 0
                          ? profile.data.followers.length
                          : "0"}
                      </p>
                      <p>
                        Followings:
                        {profile.data.followings.length > 0
                          ? profile.data.followings.length
                          : "0"}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="card"
                    aria-hidden="true"
                    style={{ background: "transparent" }}
                  >
                    <img src={"loading"} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title placeholder-glow">
                        <span className="placeholder col-6"></span>
                      </h5>
                      <p className="card-text placeholder-glow">
                        <span className="placeholder col-7"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-6"></span>
                        <span className="placeholder col-8"></span>
                      </p>
                      <a
                        className="btn btn-primary disabled placeholder col-6"
                        aria-disabled="true"
                      ></a>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <center>
                <h5 className="my-3">Welcome to aSocials:</h5>
              </center>
              <h5 className="mx-3 text-capitalize">
                Hi,{profile.data.username}
              </h5>
              <div className="d-flex m-4 w-100 px-3">
                <div className="d-flex flex-column w-50">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInputEmail"
                      placeholder="name@example.com"
                      value={email}
                      disabled={true}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label for="floatingInputEmail">Email address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputCap"
                      placeholder="name@example.com"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                    />
                    <label for="floatingInputCap">Caption</label>
                  </div>
                  {/* <div>
                    <input
                      type="file"
                      onChange={e=>convertBase64}
                      id={"pics"}
                      accept="image/*"
                    />
                    <label for="pics" className=" edit_profile mb-3">
                      <center>Change Profile Picture</center>
                    </label>
                    {profilePic && (
                      <>
                        <div className="d-flex p-2">
                          <p className="mx-3">Preview:</p>
                          <img
                            src={profilePic}
                            alt="preview"
                            className="img_preview ml-2"
                          />
                        </div>
                      </>
                    )}
                  </div> */}
                  <button
                    className="btn_edit my-2"
                    onClick={() => setEdit(false)}
                  >
                    Cancel
                  </button>
                </div>

                <div className="d-flex flex-column w-50 px-3">
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingInputPass"
                      placeholder="name@example.com"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label for="floatingInputPass">Password</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInputLoc"
                      placeholder="name@example.com"
                      value={loc}
                      onChange={(e) => setLoc(e.target.value)}
                    />
                    <label for="floatingInputLoc">Location</label>
                  </div>
                  {/* <div className="">
                    <input
                      type="file"
                      onChange={convertBase64Cover}
                      id={"pics"}
                      accept="image/*"
                    />
                    <label for="pics" className=" edit_profile mb-3">
                      <center>Change Cover Picture</center>
                    </label>
                    {coverPic && (
                      <>
                        <div className="d-flex p-2">
                          <p className="mx-3">Preview:</p>
                          <img
                            src={coverPic}
                            alt="preview"
                            className="img_preview ml-2"
                          />
                        </div>
                      </>
                    )}
                  </div> */}
                  <button
                    style={{
                      height: "calc(3.5rem + calc(var(--bs-border-width) * 2))",
                    }}
                    className="btn my-2"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </>
          )}
          <Tooltip id="my-tooltip" />
          <Tooltip id="my-tooltip-picture" />
        </div>
      </div>
    </>
  );
};

export default MyProfile;
