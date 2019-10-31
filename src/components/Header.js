import React from "react";
import "../styles/Header.css";
import logo from "../images/slice-it-logo.svg";
import slice from "../images/logo-slice.svg";
// import logotext from "../images/logo-text.svg";
import loginprofile from "../images/login.jpg";
import { NavLink } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import PizzaSlice from "../images/logo.svg"


class Header extends React.Component {
  render() {
    return (
      <UserContext.Consumer>
        {context => (
          <header>
            <NavLink to="/" id="logo">
              <div className="sliceLogo">
                <img className="logo" src={logo} alt="Slice-it Logo" />
              </div>
              <div className="mobilelogo">
                <img className="slicepiece" src={slice} alt="Slice Icon"></img>
                {/* <img className="" src={logotext} alt="Small Logo Text"></img> */}
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
                    Ranking
                  </NavLink>
                </li>
                {/* will be NavLinks when routes are set */}
                {context.state.isLoggedIn ? (
                  <div className="logoutPizzaCount">
                    <button className="login-button" onClick={context.logOut}>
                      <span className="logouttext">Log Out</span>
                    </button>
                    <div className="pizzaContainer">
                      <img
                        className="pizzalogo"
                        src={PizzaSlice}
                        alt="slice-it-logo"
                      />
                      <span className="slices">
                        {context.state.user.pizzaSlicesWeekly}
                      </span>
                    </div>
                  </div>
                ) : (
                  <button className="login-button" onClick={context.showModal}>
                    <span className="logintext">Log In</span>
                    <img className="profile" src={loginprofile} alt="Login Icon"></img>
                  </button>
                )}
              </ul>
            </nav>
          </header>
        )}
      </UserContext.Consumer>
    );
  }
}

export default Header;
