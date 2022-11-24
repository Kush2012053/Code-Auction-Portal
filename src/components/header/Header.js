import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../images/brllogo.png";
import bell from "../../images/bell.png";

const Header = () => {
  return (
    <>
      <div className="headerdiv">
        <ul className="headerul">
          <li className="headerli">
            <NavLink
              to="dashboard/rules"
              className="navlink"
              activeClassName="active"
            >
              Rules
            </NavLink>
          </li>
          <li className="headerli">
            <NavLink
              to="dashboard/auction"
              className="navlink"
              activeClassName="active"
            >
              Auction
            </NavLink>
          </li>
          <li className="headerli">
            <NavLink
              to="dashboard/solve"
              className="navlink"
              activeClassName="active"
            >
              Solve
            </NavLink>
          </li>
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
            <div className="belldiv">
              <div className="smalldiv">
                <img src={bell} alt="bell" height="100%" width="100%" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Header;
