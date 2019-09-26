import React from 'react';
import PizzaSlice from '../images/pizza-slice.svg';
import BearsLogo from '../images/bears-logo.svg';
import UserAvatar from '../images/user-avatar.svg';
import '../styles/Reply.css';

class Reply extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="reply">
        <div className="reply-body">
          <div className="reply-avatar">
            <img className="user-avatar" src={this.props.currentReply.gravatar} alt="profilepic" />
          </div>
          <div className="reply-details">
            <div className="reply-owner">
              <span className="username">
                {this.props.currentReply.username}
              </span>
            </div>
            <div className="betDetails">
              <span id="bet-amount">5</span>
              <img id="pizzaSlice" src={PizzaSlice} alt="pizza slice" />
              <span className="spanreply">on</span>
              <img className="bet-logo" src={BearsLogo} alt="bet logo" />
            </div>
            <div className="reply-time">
              <span id="timeAgo">5 minutes ago</span>
            </div>
          </div>
          <div className="reply-text">
            <p>{this.props.currentReply.text}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Reply;
