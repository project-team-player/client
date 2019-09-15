// Library imports here
import React from 'react';
import { getUserToken, setUserToken, removeUserToken, authenticateUser } from '../utils/auth';

// Create global contexts
export const UserContext = React.createContext();

// Then create a provider Component
class UserProvider extends React.Component {
  state = {
    horse: 'Horse!',
    isVisible: false,
    loginView: true,
    isLoggedIn: false,
    user: {
      comments: []
    }
  }

  isUserLoggedIn = () => {
    // Makes a call to backend to check if token is valid and sets isLoggedIn to true
    const token = getUserToken();
    if (token) {
     authenticateUser().then(response => {
        const { user } = response.data;
        if (user) {
          this.setState({ isLoggedIn: true, user });
        } else {
          console.log('something is wrong');
        }
      })
    }  
  }

  componentDidMount() {
    // Check if user is logged in
    this.isUserLoggedIn();
  }

  render() {
    return (
      <UserContext.Provider value={{ 
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
          this.setState({isLoggedIn: true, user})
        },
        logOut: () => {
          removeUserToken();
          this.setState({ isLoggedIn: false, user: { comments: [] } });
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