import React from "react";
import "../styles/Header.css";
import logo from "../images/slice-it-logo.svg";
import { NavLink } from "react-router-dom";
import { AuthContext } from '../contexts/UserContext';

class Header extends React.Component {
  render() {
    return (
      <AuthContext>
        {context => (
          <header>
        <NavLink to="/" id="logo">
          <div className="sliceLogo">
            <img className="logo" src={logo} alt="Slice-it Logo" />
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
            {this.props.isLoggedIn ? 
              <button className="specificLogin" onClick={context.logOut}>
                Log Out
              </button>
              :
              <button className="specificLogin" onClick={context.showModal}>
                Log In
              </button>
            }

          </ul>
        </nav>
      </header>
        )}
      </AuthContext>
    );
  }
}

export default Header;
