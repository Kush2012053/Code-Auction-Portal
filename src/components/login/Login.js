import { useState } from "react";
import Api from "../../Api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import brllogo from "../../images/brllogo.png";
import teamname from "../../images/teamname.png";

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const userNameChangeHandler = (e) => {
    setUserName(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      leader_email: userName,
      password: password,
    };
    console.log(data);
    const res = await axios.post(Api.login, data).catch((err) => {
      alert(err.response.data.message);
      console.log(err.response.data.message);
    });
    if (res) {
      alert(res.data.message);
      console.log(res.data.message);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("question", "");
      localStorage.setItem("page", 1);
      navigate("dashboard/rules");
    }
  };

  return (
    <>
      <div className="frontimage">
        <div className="frontinnerimage">
          <img src={brllogo} alt="brllogo" height="100%" width="100%" />
        </div>
      </div>
      <div className="frontmainheading">
        <h1 className="frontheading">
          Welcome to the Code Auction,
          <br />
          Engineers
        </h1>
      </div>
      <div className="logindiv">
        <div className="loginfirst">
          <div className="leftimgdiv">
            <img src={teamname} alt="teamname" height="100%" width="100%" />
          </div>
        </div>
        <div className="loginsecond">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              onChange={userNameChangeHandler}
              value={userName}
              className="inputdesign"
              placeholder="Email"
              required
            />
            <br />
            <br />
            <input
              type="password"
              onChange={passwordChangeHandler}
              value={password}
              className="inputdesign"
              placeholder="Password"
              required
            />
            <br />
            <br />
            <br />
            <input
              type="submit"
              value="Login"
              className="inputdesign"
              style={{
                backgroundColor: "#8b444d",
                borderRadius: "30px",
                color: "white",
                letterSpacing: "2px",
                cursor: "pointer",
              }}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
