import React from "react";
import PizzaSlice from "../images/pizza-slice.svg";
import BearsLogo from "../images/bears-logo.svg";
import UserAvatar from "../images/user-avatar.jpg";
import "../styles/GameThread.css";

class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="comment">
        <div className="comment-body">
          <div className="comment-details">
            <img className="user-avatar" src={UserAvatar} alt="profilepic" />
            <div className="betDetails">
              <span className="username">
                {this.props.currentComment.owner}
              </span>
              <img id="pizzaSlice" src={PizzaSlice} alt="pizza slice" />
              <span>5</span>
              <span className="spanComment"> on</span>
              <img className="bet-logo" src={BearsLogo} />
            </div>
            <span id="timeAgo">5 minutes ago</span>
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
