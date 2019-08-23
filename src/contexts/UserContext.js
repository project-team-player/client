// Library imports here
import React from 'react';
var cookie = require('cookie');

// Create global contexts
const UserContext = React.createContext();

// Then create a provider Component
class UserProvider extends React.Component {
  state = {
    isVisible: false,
  }
  render() {
    return (
      <UserContext.Provider value={{ 
        state: this.state,
        showModal: () => this.setState({isVisible: true}),
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