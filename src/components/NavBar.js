import React from "react";
import "../styles/NavBar.css";
import pizza from "../media/za.png";
// import { NavLink } from "react-router-dom";

class NavBar extends React.Component {
  render() {
    return (
      <header>
        <div className="sliceLogo">
          <img className="logo" src={pizza} alt="Slice-it Logo" />
        </div>
        <nav>
          <ul className="links">
            <li className="linkNames">
              {/* will be NavLinks when routes are set */}
              <a className="specificLinks">Games</a>
            </li>
            <li className="linkNames">
              {/* will be NavLinks when routes are set */}
              <a className="specificLinks">Leaderboard</a>
            </li>
            {/* will be NavLinks when routes are set */}
            <li className="loginButton">
              <a>Log in</a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default NavBar;
