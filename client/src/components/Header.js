import React from "react";
import "../styles/Header.css";
import pizza from "../media/za.png";
import { NavLink } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <header>
        <NavLink to="/" id="logo">
          <div className="sliceLogo">
            <img className="logo" src={pizza} alt="Slice-it Logo" />
          </div>
        </NavLink>
        <nav>
          <ul className="links">
            <li className="linkNames">
              <NavLink exact to="/" className="specificLinks">
                Games
              </NavLink>
            </li>
            <li className="linkNames">
              <NavLink to="/leaderboard" className="specificLinks">
                Leaderboard
              </NavLink>
            </li>
            {/* will be NavLinks when routes are set */}
            <li className="loginButton">
              <NavLink to="/login" className="specificLogin">
                Login
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
