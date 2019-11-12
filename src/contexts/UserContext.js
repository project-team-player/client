// Library imports here
import React from "react";
import {
  getUserToken,
  setUserToken,
  removeUserToken,
  authenticateUser
} from "../utils/auth";
import PropTypes from "prop-types";
import ReactGA from "react-ga";

// Create global contexts
export const UserContext = React.createContext();

// Then create a provider Component
class UserProvider extends React.Component {
  state = {
    showAuthModal: false,
    modalLoginMessage: "",
    loginView: true,
    isLoggedIn: false,
    user: {
      comments: []
    }
  };

  isUserLoggedIn = () => {
    // Makes a call to backend to check if token is valid and sets isLoggedIn to true
    const token = getUserToken();
    if (token) {
      authenticateUser().then(response => {
        const { user } = response.data;
        if (user) {
          this.setState({ isLoggedIn: true, user });
        } else {
          console.log("something is wrong");
        }
      });
    }
  };

  componentDidMount() {
    // Check if user is logged in
    this.isUserLoggedIn();
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          state: this.state,
          logIn: (token, user) => {
            // TODO: Improve cookie security
            // if (process.env.REACT_APP_PRODUCTION) {
            //   // If in production, create a more secure token
            //   cookies.set('bearerToken', token, { path: '/', secure: true, httpOnly: true});
            // } else {
            //   // In development
            //   cookies.set('bearerToken', token, { path: '/', });
            // }
            setUserToken(token);
            this.setState({ isLoggedIn: true, user });
            ReactGA.event({
              category: "LogIn",
              action: "User Logged into his/her account."
            });
          },
          logOut: () => {
            removeUserToken();
            this.setState({ isLoggedIn: false, user: { comments: [] } });
            ReactGA.event({
              category: "LogOut",
              action: "User Logged out of his/her account."
            });
          },
          isUserLoggedIn: () => {
            this.isUserLoggedIn();
          },
          showModal: (message = "", login = true) => {
            this.setState({
              showAuthModal: true,
              loginView: login,
              modalLoginMessage: message.length ? message : ""
            });
            ReactGA.event({
              category: "ShowModal",
              action: "User opened the authentication modal."
            });
          },
          hideModal: () =>
            this.setState({ showAuthModal: false, modalLoginMessage: "" }),
          showLogin: () => {
            this.setState({ loginView: true });
            ReactGA.event({
              category: "ShowLogIn",
              action: "User opened the Login modal."
            });
          },
          showSignup: () => {
            this.setState({ loginView: false });
            ReactGA.event({
              category: "ShowSignUp",
              action: "User opened the Sign Up modal."
            });
          },
          getUserData: (key) => {
            return this.state.user[key];
          },
          /**
           * Adds or removes slices from user
           * @param  {number} sliceAmount The amount of slices to remove or add
           * @param  {string} operator Enter '+' for adding, and '-' for removing slices
           * @return {Void}
           */
          updateUserSlices: (sliceAmount, operator = "-") => {
            console.log("updating user slices");
            // Get current user state
            const user = { ...this.state.user };

            // Add or subtract slices from user based on operator param
            switch (operator) {
              case "+":
                user.pizzaSlicesWeekly += parseInt(sliceAmount);
                break;
              case "-":
                user.pizzaSlicesWeekly -= parseInt(sliceAmount);
                break;
              default:
                break;
            }

            // Update user with new slice count
            this.setState({ user });
          },
          /**
           * @param {object} newBet
           */
          addUserBet: newBet => {
            const user = { ...this.state.user };
            user.bets.push(newBet);
            this.setState({ user });
          }
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

UserProvider.propTypes = {
  user: PropTypes.object
};

const AuthContext = UserContext.Consumer;

export { AuthContext, UserProvider };
