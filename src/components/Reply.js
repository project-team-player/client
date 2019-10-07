import React from 'react';
import PizzaSlice from '../images/pizza-slice.svg';
import BearsLogo from '../images/bears-logo.svg';
import UserAvatar from '../images/user-avatar.svg';
import Arrow from '../images/arrow.svg';
import '../styles/Reply.css';
import '../styles/Comments.css';

class Reply extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { gameDetails, currentReply } = this.props;
    return (
      <div className="reply-container">
        <div className="comment-container">
          <div className="comment-card">
            <div className="comment-header">
              <div className="comment-user-info">
                <img className="comment-user-avatar" src={UserAvatar} alt="profilepic" />
                <span className="username">
                  {/* {this.props.currentComment.owner} */}
                hanshank
                </span>
              </div>

              {/* <div className="comment-bet" style={{ background: 'purple' }}>
                <span className="comment-bet-size">
                  <img className="comment-pizza-icon" id="pizzaSlice" src={PizzaSlice} alt="pizza slice" />
                8
                </span>
                <img className="comment-arrow-icon" src={Arrow} alt="Arrow icon" />
                <img className="comment-bet-team-icon" src={gameDetails.awayTeam.logo} alt="logo of the team user bet on" />
              </div> */}
            </div>
            <div className="comment-body">
              <p className="comment-text">
                {currentReply.text}
              </p>
            </div>
          </div>
        </div>
      </div>

    // <div className="reply">
    //   <div className="reply-body">
    //     <div className="reply-avatar">
    //       <img className="user-avatar" src={this.props.currentReply.gravatar} alt="profilepic" />
    //     </div>
    //     <div className="reply-details">
    //       <div className="reply-owner">
    //         <span className="username">
    //           {this.props.currentReply.username}
    //         </span>
    //       </div>
    //       <div className="betDetails">
    //         <span id="bet-amount">5</span>
    //         <img id="pizzaSlice" src={PizzaSlice} alt="pizza slice" />
    //         <span className="spanreply">on</span>
    //         <img className="bet-logo" src={BearsLogo} alt="bet logo" />
    //       </div>
    //       <div className="reply-time">
    //         <span id="timeAgo">5 minutes ago</span>
    //       </div>
    //     </div>
    //     <div className="reply-text">
    //       <p>{this.props.currentReply.text}</p>
    //     </div>
    //   </div>
    // </div>
    );
  }
}

export default Reply;
