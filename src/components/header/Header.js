import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../images/brllogo.png";
import Api from "../../Api";
import axios from "axios";
import lines from "../../images/lines.png";

const Header = () => {
  const everyStars = async () => {
    const res = await axios
      .get(Api.loginteam, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .catch((err) => {
        console.log(err);
      });
    if (res) {
      localStorage.setItem("stars", res.data.score / 100);
    }
  };

  return (
    <>
      <div className="headerdiv">
        <ul className="headerul">
          <li className="headerli" style={{ margin: "0% 3%" }}>
            <NavLink
              to="dashboard/rules"
              className="navlink"
              activeClassName="active"
            >
              Rules
            </NavLink>
          </li>
          <li className="headerli" style={{ margin: "0% 3%" }}>
            <NavLink
              to="dashboard/auction"
              className="navlink"
              activeClassName="active"
            >
              Auction
            </NavLink>
          </li>
          {/*<li className="headerli" onClick={everyStars}>
            <NavLink
              to="dashboard/solve"
              className="navlink"
              activeClassName="active"
            >
              Solve
            </NavLink>
  </li>*/}
          <li className="headerli">
            <div className="imgdiv">
              <img src={logo} alt="brllogo" height="100%" width="100%" />
            </div>
          </li>
          <li className="headerli">
            <NavLink
              to="dashboard/leaderboard"
              className="navlink"
              activeClassName="active"
            >
              Leaderboard
            </NavLink>
          </li>
          <li className="headerli">
            <NavLink
              to="dashboard/transaction"
              className="navlink"
              activeClassName="active"
            >
              Transaction
            </NavLink>
          </li>
          <li className="headerli">
            <NavLink
              to="dashboard/creator"
              className="navlink"
              activeClassName="active"
            >
              Creator
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Header;
