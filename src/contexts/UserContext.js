// Library imports here
import React from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


// Create global contexts
const UserContext = React.createContext();

// Then create a provider Component
class UserProvider extends React.Component {
  state = {
    isVisible: false,
    loginView: true,
    isLoggedIn: false,
  }

  componentDidMount() {
    if (cookies.get('bearerToken')) {
      console.log('You are logged in!');
      this.setState({isLoggedIn: true});
    }
  }

  render() {
    return (
      <UserContext.Provider value={{ 
        state: this.state,
        logIn: (token) => {
          cookies.set('bearerToken', token, { path: '/', });
          this.setState({isLoggedIn: true})
        },
        logOut: () => {
          cookies.remove('bearerToken');
          this.setState({ isLoggedIn: false });
          console.log('Logged out!');
        },
        isUserLoggedIn: () => {
          if (cookies.get('bearerToken')) {
            // this.setState({isLoggedIn: true});
            return true;
          }
        },
        showModal: () => this.setState({isVisible: true}),
        hideModal: () => this.setState({isVisible: false}),
        showLogin: () => this.setState({loginView: true}),
        showSignup: () => this.setState({loginView: false}),

      }}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

const AuthContext = UserContext.Consumer;

export {
  AuthContext,
  UserProvider
}