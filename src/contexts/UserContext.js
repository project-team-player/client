// Library imports here
import React from "react";
import {
  getUserToken,
  setUserToken,
  removeUserToken,
  authenticateUser
} from "../utils/auth";
import PropTypes from "prop-types";

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
          },
          logOut: () => {
            removeUserToken();
            this.setState({ isLoggedIn: false, user: { comments: [] } });
          },
          isUserLoggedIn: () => {
            this.isUserLoggedIn();
          },
          showModal: (message = "", login = true) => {
            this.setState({
              showAuthModal: true,
              loginView: false,
              modalLoginMessage: message.length ? message : ""
            });
          },
          hideModal: () =>
            this.setState({ showAuthModal: false, modalLoginMessage: "" }),
          showLogin: () => this.setState({ loginView: true }),
          showSignup: () => this.setState({ loginView: false }),

          /**
           * Adds or removes slices from user
           * @param  {number} sliceAmount The amount of slices to remove or add
           * @param  {string} operator Enter '+' for adding, and '-' for removing slices
           * @return {Void}
           */
          updateUserSlices: (sliceAmount, operator = "-") => {
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
