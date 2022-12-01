import { useState } from "react";
import Api from "../../Api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import brllogo from "../../images/brllogo.png";
import teamname from "../../images/teamname.png";
import Spinner from "react-spinner-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const userNameChangeHandler = (e) => {
    setUserName(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true);

    const data = {
      leader_email: userName,
      password: password,
    };
    const res = await axios.post(Api.login, data).catch((err) => {
      setLoader(false);
      toast.error(err.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });
    if (res) {
      setLoader(false);
      toast.success(res.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("question", "");
      localStorage.setItem("solveid", "");
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
            <ToastContainer />
            {!loader && (
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
            )}
            {loader && (
              <button
                className="inputdesign"
                style={{
                  backgroundColor: "#8b444d",
                  borderRadius: "30px",
                  display: "flex",
                  justifyContent: "center",
                }}
                onClick={handleSubmit}
              >
                <Spinner
                  radius={30}
                  color={"white"}
                  stroke={3}
                  visible={true}
                />
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
