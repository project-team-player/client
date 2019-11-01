import React from "react";
import "../styles/Header.css";
import logo from "../images/slice-it-logo.svg";
import slice from "../images/logo-slice.svg";
// import logotext from "../images/logo-text.svg";
import User from "../images/user.svg";
import { NavLink } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import PizzaSlice from "../images/logo.svg";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false,
    }
  }

  toggleDropdown = () => {
    this.setState({ showDropdown: !this.state.showDropdown });
  }

  render() {
    return (
      <UserContext.Consumer>
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
                  <NavLink exact to="/games" className="specificLinks">
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
                    <div className="accountDropdown">
                      <div className="accountButtonContainer">
                      <button className="accountButton" onClick={this.toggleDropdown}>
                        <img className="accountIcon" src={User}></img>
                        {/* <span className="logouttext">Log Out</span> */}
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
                      </button>
                      </div>
                      {
                        this.state.showDropdown ?
                        <div className="accountDropdownContent">
                          <div className="accountDropdownContentInner">
                          <button className="logOutButton" onClick={context.logOut}>Log Out</button>
                          </div>
                        </div> 
                        :
                        ""
                      }

                    </div>
                ) : (
                  <button className="loginButton" onClick={context.showModal}>
                    <span className="logintext">Log In</span>
                    <img className="profile" src={User} alt="Login Icon"></img>
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
