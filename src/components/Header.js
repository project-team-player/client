import React from "react";
import "../styles/Header.css";
import pizza from "../media/za.png";
import { NavLink } from "react-router-dom";
import { AuthContext } from '../contexts/UserContext';

class Header extends React.Component {
  render() {
    return (
      <AuthContext>
        {(authContext) => (
          <header>
        <NavLink to="/" id="logo">
          <div className="sliceLogo">
            <img className="logo" src={pizza} alt="Slice-it Logo" />
          </div>
        </NavLink>
        <nav>
          <ul className="links">
            <li className="linkNames">
              <NavLink exact to="/gameslist" className="specificLinks">
                Games
              </NavLink>
            </li>
            <li className="linkNames">
              <NavLink to="/leaderboard" className="specificLinks">
                Leaderboard
              </NavLink>
            </li>
            {/* will be NavLinks when routes are set */}
            <li className="loginButton" onClick={authContext.showModal}>
            Login
              {/* <NavLink to="/login" className="specificLogin">
                Login
              </NavLink> */}
            </li>
          </ul>
        </nav>
      </header>
        )}
      </AuthContext>
    );
  }
}

export default Header;
