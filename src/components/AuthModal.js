import React, { Component } from 'react';
import { UserContext } from '../contexts/UserContext';
import PropTypes from 'prop-types';
import axios from 'axios';
import { NavLink } from "react-router-dom";
import '../styles/AuthModal.css';

const SignupForm = ({handleSignup, showLoginForm, handleInputChange, formValues, formErrors, validateForm}) => {
  const { email, username, password, passwordConfirm } = formValues;
  
  return (
    <form onSubmit={handleSignup} className="auth-form">
        <h1 className="credentialTitle">Sign up and Play Now!</h1>
        <div className="auth-form-field">
          <input
            className="credentialInput"
            type="text"
            placeholder="Enter Email"
            id="signupEmailInputValue"
            name="email"
            autoComplete="email"
            value={email}
            onChange={handleInputChange}
            onBlur={(e) => validateForm(formValues, [e.target.name])}
          />
          {formErrors.email && <p className="form-error-field">{formErrors.email}</p>}
        </div>
           
          <div className="auth-form-field">
            <input
              className="credentialInput"
              type="text"
              placeholder="Create Username"
              id="signupUsernameInputValue"
              name="username"
              autoComplete="username"
              value={username}
              onChange={handleInputChange}
              onBlur={(e) => validateForm(formValues, [e.target.name])}
            />
            {formErrors.username && <p className="form-error-field">{formErrors.username}</p>}
          </div>
            <div className="auth-form-field">
              <input
                className="credentialInput"
                type="password"
                placeholder="Enter Password"
                id="signupPasswordInputValue"
                name="password"
                autoComplete="new-password"
                value={password}
                onChange={handleInputChange}
                onBlur={(e) => validateForm(formValues, [e.target.name])}
              />
              {formErrors.password && <p className="form-error-field">{formErrors.password}</p>}
            </div>
            <div className="auth-form-field">
              <input
                className="credentialInput"
                type="password"
                placeholder="Confirm Password"
                id="signupPasswordConfirmInputValue"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={handleInputChange}
                onBlur={(e) => validateForm(formValues, [e.target.name])}
              />
              {formErrors.passwordConfirm && <p className="form-error-field">{formErrors.passwordConfirm}</p>}
            </div>
        <button className="submitButton" type="submit">
          Sign Up
        </button>
        <span className="switch-modal-info">All ready have an account? <a href="#" onClick={showLoginForm}className="switch-modal-link">Log In</a></span>
    </form>
  )
}

const LoginForm = ({ showSignupForm, handleLogin, handleInputChange, formValues, formErrors, validateForm, loginError}) => {

  return (
    <form onSubmit={handleLogin} className="auth-form">
      <h1 className="credentialTitle">Log In</h1>
      <span className="login-error-message">{loginError && loginError}</span>
        <div class="auth-form-field">
          <input
            className="credentialInput"
            type="text"
            placeholder="Enter username"
            id="signupUsernameInputValue"
            name="username"
            onChange={handleInputChange}
          />
        </div>
        <div className="auth-form-field">
          <input
            className="credentialInput"
            type="password"
            placeholder="Enter Password"
            id="signupPasswordInputValue"
            name="password"
            onChange={handleInputChange}
          />
        </div>
      <button className="submitButton" type="submit">
        Log In
      </button>
      <span className="switch-modal-info">No account? <NavLink onClick={showSignupForm} className="switch-modal-link">Sign Up</NavLink></span>
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
      formValues: {
        email: '',
        username: '',
        password: '',
        passwordConfirm: '',
      },
      formErrors: {
        email: '',
        username: '',
        password: '',
        passwordConfirm: '',
      },
      loginError: '',
      showLogin: false,
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.showLoginForm = this.showLoginForm.bind(this);
    this.showSignupForm = this.showSignupForm.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleInputChange = event => {
    const { value, name } = (event.target);
    const formValues = {...this.state.formValues};
    const formErrors = {...this.state.formErrors}
    formValues[name] = value;
    

    // pass all inputs to formValidator
    if (formErrors[name].length) {
      this.validateForm(formValues, [name]);
    }

    this.setState({formValues});
  };

  anyFormErrors() {
    const { formErrors } = this.state;
    let errors = false;
    const errorKeys = Object.keys(formErrors);
    errorKeys.forEach(key => {
      if (formErrors[key].length) errors = true;
    })
    return errors;
  }

  validateForm(formValues, keys = Object.keys(this.state.formValues)) {
    const {email, username, password, passwordConfirm} = formValues;
    const formErrors = {...this.state.formErrors};
    
    // Iterates over all keys and checks the whole form
    keys.forEach(keyName => {
      const value = this.state.formValues[keyName];
      let errorMessage = '';

    // If field is empty
    if (value.length === 0) {
      errorMessage = 'Field required. Do not leave empty.';
    } else {
       // EMAIL
    if (keyName === 'email') {
      // TODO:// Implement email checks
      if (!value.includes('@')) {
        errorMessage = 'Please enter valid email address.'
      }
    }
    // USERNAME 
    if (keyName === 'username') {
      // not more than 15 characters long
      if (value.length > 20) {
        errorMessage = 'Username can maximum be 20 characters long';
      }

    }

    // PASSWORD
    // Regular expression checks for at least one of each (uppercase/lowercase letter, special character and number).
    const passwordStrength = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;
    if (keyName === 'password') {
      // Min 8 chars
      if (value.length < 8) {
        errorMessage = 'Password must contain at least 8 characters'
      }
      // Might add back later for added layer of security
      // else if (!passwordStrength.test(value)) {
      //   errorMessage = 'Password needs 1 uppercase, lowercase, numeric and special character.'
      // }
    }

    if (keyName === 'passwordConfirm') {
      if (value !== formValues['password']) {
        errorMessage = 'Password must match.'
      }
    }
    // Add the error to the form
  }
  formErrors[keyName] = errorMessage;
  })
   this.setState({formErrors})
  }

  handleLogin = (e) => {
    e.preventDefault();
    const { formValues: { username, password }, formValues } = this.state;
    if (!this.anyFormErrors()) {
      axios.post(`${process.env.REACT_APP_SERVER_URL}/authenticate/login`, { username, password } )
      .then(response => {
        const { token, user } = response.data;
      this.context.logIn(token, user);
      this.context.hideModal();
    }).catch(error => {
      let loginError = '';
      if (error.response.status === 500) {
        loginError = 'We are having some issues at the moment. Please try again later or contact teamplayer4321234@gmail.com for assistance.'
      } else {
        loginError = 'Password or email incorrect. Please try again.'
      }
      this.setState({ loginError: 'Password or email incorrect. Please try again.' })
    });
    } else {
      this.validateForm(formValues);
    }
  }

  handleSignup = (event) => {
    const { formValues: { email, username, password, passwordConfirm }, formValues } = this.state;
    
    if (!this.anyFormErrors()) {
      axios.post(`${process.env.REACT_APP_SERVER_URL}/authenticate/signup`, { email, username, password, passwordConfirm }).then(response => {
        this.context.logIn(response.data.token);
        this.context.hideModal();
      })  
    } else {
      this.validateForm(formValues);
    }
    event.preventDefault();
  }

  showSignupForm() {
    this.context.showSignup();
  }

  showLoginForm() {
    this.context.showLogin();
  }

  render() {
    const { loginView } = this.context.state;
    const { formValues, formErrors, loginError } = this.state;

    // Conditionally renders login or signup form based on context state 
    return (
      <div className="auth-modal">
      {
        loginView ?
        <LoginForm 
          handleLogin={this.handleLogin} 
          showSignupForm={this.showSignupForm} 
          handleInputChange={this.handleInputChange} 
          validateForm={this.validateForm}
          formValues={formValues}
          formErrors={formErrors}
          loginError={loginError}
        />
        : 
        <SignupForm 
          handleSignup={this.handleSignup} 
          showLoginForm={this.showLoginForm}
          handleInputChange={this.handleInputChange}
          validateForm={this.validateForm} 
          formValues={formValues}
          formErrors={formErrors}
        />
      }
      </div>
    )
  }
}

AuthModal.contextType = UserContext;

export default AuthModal;
