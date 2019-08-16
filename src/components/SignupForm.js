import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import '../styles/CredentialForm.css';
// import { withRouter } from 'react-router-dom';

class SignupForm extends Component {
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
    };
  }

  handleInputChange = event => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const {
      signupPasswordInputValue,
      signupPasswordConfirmInputValue,
      signupEmailInputValue,
    } = this.state;
    // Regex
    const re = /\S+@\S+\.\S+/;
    // FIXME: Create a validation middleware we can use instead of these checks here.
    if (re.test(String(signupEmailInputValue).toLowerCase()) !== true) {
      Swal.fire({
        type: 'error',
        text: 'Enter a valid email',
        showConfirmButton: false,
        timer: 1200,
      });
    } else if (signupPasswordInputValue !== signupPasswordConfirmInputValue) {
      Swal.fire({
        type: 'error',
        text: 'New passwords must match',
        showConfirmButton: false,
        timer: 1200,
      });
    } else {
      this.props.handleSignup({
        username: this.state.signupUsernameInputValue,
        password: this.state.signupPasswordInputValue,
        email: this.state.signupEmailInputValue,
      });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="credentialForm">
        <h1 className="credentialTitle">Sign up and Play Now!</h1>
        <label htmlFor="signupUsernameInputValue">
          <input
            className="credentialInput"
            type="text"
            placeholder="Create Username"
            id="signupUsernameInputValue"
            name="signupUsernameInputValue"
            autoComplete="username"
            value={this.state.signupUsernameInputValue}
            onChange={this.handleInputChange}
          />
        </label>
        <label htmlFor="signupEmailInputValue">
          <input
            className="credentialInput"
            type="text"
            placeholder="Enter Email"
            id="signupEmailInputValue"
            name="signupEmailInputValue"
            autoComplete="email"
            minLength="7"
            value={this.state.signupEmailInputValue}
            onChange={this.handleInputChange}
          />
        </label>
        <span className="passwordInputs">
          <label htmlFor="signupPasswordInputValue">
            <input
              className="credentialInput"
              type="password"
              placeholder="Enter Password"
              id="signupPasswordInputValue"
              name="signupPasswordInputValue"
              autoComplete="new-password"
              minLength="8"
              value={this.state.signupPasswordInputValue}
              onChange={this.handleInputChange}
            />
          </label>
          <label htmlFor="signupPasswordConfirmInputValue">
            <input
              className="credentialInput"
              type="password"
              placeholder="Confirm Password"
              id="signupPasswordConfirmInputValue"
              name="signupPasswordConfirmInputValue"
              autoComplete="new-password"
              minLength="8"
              value={this.state.signupPasswordConfirmInputValue}
              onChange={this.handleInputChange}
            />
          </label>
        </span>
        <button className="submitButton" type="submit">
          Create my account
        </button>
      </form>
    );
  }
}

export default SignupForm;
