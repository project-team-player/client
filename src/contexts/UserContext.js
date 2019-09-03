// Library imports here
import React from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
const cookies = new Cookies();

// Create global contexts
const UserContext = React.createContext();

// Then create a provider Component
class UserProvider extends React.Component {
  state = {
    username: '',
    email: '',
    isVisible: false,
    loginView: true,
    isLoggedIn: false,
  }

  isUserLoggedIn = () => {
    // Makes a call to backend to check if token is valid and sets isLoggedIn to true
    const jwtCookie = cookies.get('bearerToken');
    const token = jwtCookie.split('JWT ')[1];
    axios({ method: 'POST', url: `${process.env.REACT_APP_PECORINA_SERVER_API}/authenticate`, headers: {authorization: `Bearer ${token}`}}).then(response => {
      const { email, username } = this.state;
      if (response.data.username) {
        this.setState({ isLoggedIn: true, email, username });
      }
    });
  }

  componentDidMount() {
    // Check if user is logged in
    this.isUserLoggedIn();
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
          this.isUserLoggedIn();
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