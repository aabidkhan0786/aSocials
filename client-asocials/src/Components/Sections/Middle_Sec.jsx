import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPosts } from "../../Redux/Actions/Posts";
import Avatar from "react-avatar";
import { findUser } from "../../Redux/Actions/Users";
import Feed from "../Pages/Feed";
import { Link } from "react-router-dom";
import Left_Sec from "./Left_Sec";

const Middle_Sec = ({ posts, loggedUser, myPost }) => {
  const [file, setFile] = useState("");
  const [desc, setDesc] = useState("");
  const [loc, setLoc] = useState("");
  const [modal, setModal] = useState(false);
  const [picName, setPicName] = useState("");
  const dispatch = useDispatch();

  const convertBase64 = (e) => {
    e.preventDefault();
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    setPicName(e.target.files[0].name);
    reader.onload = () => {
      setFile(reader.result);
    };
    reader.onerror = (error) => {
      console.log(error);
    };
  };

  const createPost = () => {
    const newPost = {
      userId: loggedUser.user._id,
      username: loggedUser.user.username,
      desc: desc,
      img: file,
      location: loc,
    };
    dispatch(createPosts(newPost));
    setDesc("")
    setFile("")
    setPicName("")
  };

  console.log({ posts });

  return (
    <>
      <div
        className="d-flex justify-content-center flex-column"
        style={{ marginBottom: "68px" }}
      >
<nav class="navbar small_nav  bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand logo" href="#">aSoci@ls</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title logo" id="offcanvasNavbarLabel">aSoci@ls</h5>
        <button type="button" class="btn-close me-3" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li class="nav-item d-flex">
          <i class="fa-solid fa-user pt-2"></i><Link class="nav-link active pt-1 px-1" to={`profile/${loggedUser.user.username}`} state={{data:loggedUser.user}} aria-current="page" href="#">My Profile</Link>
          </li>
          <li class="nav-item">
            <Left_Sec loggedUser={loggedUser} myPost={myPost} />
          </li>
        </ul>

      </div>
    </div>
  </div>
</nav>
        <div className="glass post_cover ">
          <center>
            <input
              className="status"
              type="text"
              placeholder="What's on your mind...."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </center>

          <div className="buttons_sec">
            <input
              type="file"
              onChange={convertBase64}
              id={"pics"}
              accept="image/*"
            />

            <div className="d-flex justify-content-around place-items-center mt-3 mb-2">
              <div className="d-flex flex-column p-1">
                <label for="pics" className="input_file  glow_text mt-2 title">
                  <i class="fa-solid fa-photo-film"></i> Photos
                </label>
              </div>

              {/* <div class="form-floating" style={{width:"140px"}} >
                <select class="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={(e)=> setLoc(e.target.value)} >
                  <option value="1"><i class="fa-solid fa-street-view"></i>One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <label className="fs-5 text-center" for="floatingSelect"><i class="fa-solid fa-street-view"></i>Location</label>
              </div> */}

              <button className="input_file mt-2 btn" onClick={createPost}>
                <i class="fa-solid fa-share"></i>
                Share
              </button>
            </div>
            {file && (
              <>
                <div className="d-flex p-2">
                  <div className="flex-column">
                    <p className="mx-3">Preview:</p>
                    <p>{picName && picName}</p>
                  </div>
                  <img src={file} alt="preview" className="img_preview ml-2" />
                </div>
              </>
            )}
          </div>
        </div>
        <hr />
        {/* review posts */}
        {!posts.length ? (
          <>
            <div
              aria-hidden="true"
              style={{ background: "transparent" }}
              className="d-flex card  flex-column justify-content-center"
            >
              <p className="text-center pt-2" >Please add new friends/post to display  </p>
              <div>
                
                <Left_Sec loggedUser={loggedUser} myPost={myPost} />
                </div>
              {/* <img src="..." class="card-img-top" alt="loading" />
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
              </div> */}
            </div>
          </>
        ) : (
          posts &&
          posts.map((p) => <Feed p={p} loggedUser={loggedUser} key={p._id} />)
        )}
      </div>
    </>
  );
};

export default Middle_Sec;
