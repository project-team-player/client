import React from 'react';
import '../contexts/UserContext';
import { AuthContext } from '../contexts/UserContext';

const AuthModal = () => {
  return(
    <AuthContext>
      {(context) => {
        if (context.state.isVisible) {
          return (
            <form className="credentialForm">
          <h1 className="credentialTitle">Sign up and Play Now!</h1>
          <label htmlFor="signupUsernameInputValue">
            <input
              className="credentialInput"
              type="text"
              placeholder="Create Username"
              id="signupUsernameInputValue"
              name="signupUsernameInputValue"
              autoComplete="username"
              // value={this.state.signupUsernameInputValue}
              // onChange={this.handleInputChange}
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
              // value={this.state.signupEmailInputValue}
              // onChange={this.handleInputChange}
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
                // value={this.state.signupPasswordInputValue}
                // onChange={this.handleInputChange}
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
                // value={this.state.signupPasswordConfirmInputValue}
                // onChange={this.handleInputChange}
              />
            </label>
          </span>
          <button className="submitButton" type="submit">
            Create my account
          </button>
        </form>
          )
        }   
      }}
    </AuthContext>
  )
}

export {
  AuthModal
}