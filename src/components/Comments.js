import React from "react";
import PizzaSlice from "../images/pizza-slice.svg";
import BearsLogo from "../images/bears-logo.svg";
import UserAvatar from "../images/user-avatar.jpg";
import "../styles/Comments.css";

class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="comment">
        <div className="comment-body">
          <div className="comment-avatar">
            <img className="user-avatar" src={UserAvatar} alt="profilepic" />
          </div>
          <div className="comment-details">
            <div className="comment-owner">
              <span className="username">
                {this.props.currentComment.owner}
              </span>
            </div>
            <div className="betDetails">
              <span id="bet-amount">5</span>
              <img id="pizzaSlice" src={PizzaSlice} alt="pizza slice" />
              <span className="spanComment">on</span>
              <img className="bet-logo" src={BearsLogo} alt="bet logo" />
            </div>
            <div className="comment-time">
              <span id="timeAgo">5 minutes ago</span>
            </div>
          </div>
          <div className="comment-text">
            <p>{this.props.currentComment.text}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Comments;
