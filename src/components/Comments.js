import React from "react";
import PizzaSlice from "../images/pizza-slice.svg";
import BearsLogo from "../images/bears-logo.svg";
import UserAvatar from "../images/user-avatar.jpg";
import "../styles/Comments.css";
import Reply from "./Reply.js";


class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      replies: []
    };
  }

  render() {
    const {postReplyHandler} = this.props;
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
        <div className='reply-container'>
          {this.props.currentComment.replies
          .map((reply, i) => <Reply currentReply={reply} key={i} />)}
        </div>
        <form className='reply-input-container'>
          <textarea rows='6' cols='20' id='reply-input-text'  className='reply-input' type="text" name="reply-text"></textarea>
          <input type="button" onClick={ () => postReplyHandler(document.getElementById('reply-input-text').value, this.props.currentComment._id) } value="Submit"></input>
        </form>
      </div>
    );
  }
}

export default Comments;
