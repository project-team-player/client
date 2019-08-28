import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import axios from 'axios';
import { NavLink } from "react-router-dom";
import Cookies from 'universal-cookie';
import '../styles/AuthModal.css';
// import { withRouter } from 'react-router-dom';

const cookies = new Cookies();


const SignupForm = ({handleSignup, showLoginForm }) => {
  return (
    <form onSubmit={handleSignup} className="auth-form">
        <h1 className="credentialTitle">Sign up and Play Now!</h1>
          <input
            className="credentialInput"
            type="text"
            placeholder="Enter Email"
            id="signupEmailInputValue"
            // name="signupEmailInputValue"
            name="email"
            autoComplete="email"
            minLength="7"
            // value={this.state.signupEmailInputValue}
            // onChange={this.handleInputChange}
          />
          <input
            className="credentialInput"
            type="text"
            placeholder="Create Username"
            id="signupUsernameInputValue"
            // name="signupUsernameInputValue"
            name="username"
            autoComplete="username"
            // value={this.state.signupUsernameInputValue}
            // onChange={this.handleInputChange}
          />
            <input
              className="credentialInput"
              type="password"
              placeholder="Enter Password"
              id="signupPasswordInputValue"
              // name="signupPasswordInputValue"
              name="password"
              autoComplete="new-password"
              minLength="8"
              // value={this.state.signupPasswordInputValue}
              // onChange={this.handleInputChange}
            />
            <input
              className="credentialInput"
              type="password"
              placeholder="Confirm Password"
              id="signupPasswordConfirmInputValue"
              // name="signupPasswordConfirmInputValue"
              name="passwordConfirm"
              autoComplete="new-password"
              minLength="8"
              // value={this.state.signupPasswordConfirmInputValue}
              // onChange={this.handleInputChange}
            />
        <button className="submitButton" type="submit">
          Sign Up
        </button>
        <span>All ready have an account? </span><a href="#" onClick={showLoginForm} className="switch-modal-link">Log In</a>
    </form>
  )
}

const LoginForm = ({ showSignupForm, handleLogin}) => {
  return (
    <form onSubmit={handleLogin} className="auth-form">
      <h1 className="credentialTitle">Log In</h1>
        <input
          className="credentialInput"
          type="text"
          placeholder="Enter username"
          id="signupUsernameInputValue"
          // name="signupUsernameInputValue"
          name="username"
          autoComplete="username"
          // value={this.state.signupUsernameInputValue}
          // onChange={this.handleInputChange}
        />
          <input
            className="credentialInput"
            type="password"
            placeholder="Enter Password"
            id="signupPasswordInputValue"
            // name="signupPasswordInputValue"
            name="password"
            autoComplete="new-password"
            minLength="8"
            // value={this.state.signupPasswordInputValue}
            // onChange={this.handleInputChange}
          />
      <button className="submitButton" type="submit">
        Log In
      </button>
      <span>No account? </span><NavLink onClick={showSignupForm} className="switch-modal-link">Sign Up</NavLink>
  </form>
  )
}

class AuthModal extends Component {
  static propTypes = {
    handleSignup: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      signupUsernameInputValue: '',
      signupPasswordInputValue: '',
      signupPasswordConfirmInputValue: '',
      signupEmailInputValue: '',
      showLogin: false,
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.setTokenCookie = this.setTokenCookie.bind(this);
    this.showLoginForm = this.showLoginForm.bind(this);
    this.showSignupForm = this.showSignupForm.bind(this);
  }

  handleInputChange = event => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({ [name]: value });
  };

  setTokenCookie = token => {
    const todaysDate = new Date();
    const expiration = todaysDate.setDate(todaysDate.getDate() + 1)
    cookies.set('bearerToken', token, { path: '/', });
  }

  handleLogin = (e) => {
    e.preventDefault();

    console.log('Logging in');
    const username = e.target.username.value;
    const password = e.target.password.value;

    axios.post(`${process.env.REACT_APP_PECORINA_SERVER_API}/authenticate/login`, { username, password } )
    .then(response => this.setTokenCookie(response.data.token));
  }

  handleSignup = (event) => {
    const form = event.target;
    const email = form.email.value;
    const username = form.username.value;
    const password = form.password.value;
    const passwordConfirm = form.passwordConfirm.value;
    
    axios.post(`${process.env.REACT_APP_PECORINA_SERVER_API}/authenticate/signup`, { email, username, password, passwordConfirm }).then(response => this.setTokenCookie(response.data.token));
    event.preventDefault();
  }

  showSignupForm() {
    console.log('showing signup');
    this.setState({ showLogin: false });
  }

  showLoginForm() {
    this.setState({ showLogin: true });
  }

  render() {
    const { showLogin } = this.state;
    // if (showLogin) {
    //   return <LoginForm handleLogin={this.handleLogin} />
    // }
    // return <SignupForm handleSignup={this.handleSignup} />

    return (
      <div className="auth-modal">
      {
        showLogin ?
        <LoginForm handleLogin={this.handleLogin} showSignupForm={this.showSignupForm} />
        : 
        <SignupForm handleSignup={this.handleSignup} showLoginForm={this.showLoginForm}  />
      }
      </div>
    )
  }
}

export default AuthModal;
