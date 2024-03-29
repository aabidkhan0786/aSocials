import React, { useState } from "react";
import "../style.css";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../Redux/Actions/Users";
import validator from 'validator'

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useNavigate();
  const [loading, setLoading] = useState(false)

  const handleRegister = () => {
    setLoading(true)
    if (password.length <= 6) {
      return alert("Password should be 6 character long!");
    }
    if (!validator.isEmail(email)) {
      return alert("Please enter valid email!");
    }
    const registerDetails = {
      email,
      password,
      username,
    };
    dispatch(register(registerDetails, history));
    setLoading(false)
  };
  return (
    <>
      <div className=" register_cover">
        <div className="glass register_card">
          <div className="box_1">
            <h2>aSoci@ls</h2>
            <p>Explore the beauty of people,place and things</p>
            <div className='stick_bottom px-1'>
              <p>More By A.A.K:
                <a href="https://vid-shot-aabidkhan0786.vercel.app/" className='mx-2' target='_blank'>
                  <u>VidShot</u></a></p>
            </div>
          </div>
          <div className="box_2">
            <input
              type="text"
              className="input_text"
              placeholder="Enter username"
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="email"
              className="input_text"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="input_text"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="btn  my-2"
              style={{ width: "80%" }}
              onClick={handleRegister}
            >
              Sign Up
            </button>
            <small className="my-3">
              Already enjoying aSoci@ls?{" "}
              <Link className="mx-1" to="/login">
                {
                  loading ? "Signing in" : "Sign In"
                }
              </Link>
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
