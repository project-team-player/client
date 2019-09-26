import React from 'react';
import PizzaSlice from '../images/pizza-slice.svg';
import BearsLogo from '../images/bears-logo.svg';
import UserAvatar from '../images/user-avatar.svg';
import Arrow from '../images/arrow.svg';
import '../styles/Comments.css';
import Reply from './Reply.js';


class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      replies: [],
    };
  }

  componentWillMount() {
    this.setState({ replies: this.props.currentComment.replies });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.replies !== this.props.replies) {
      this.setState({ replies: this.props.currentComment.replies });
    }
  }

  render() {
    const {
      postReplyHandler, currentComment, gameDetails, gameDetails: { awayTeam: { key: awayTeam }, homeTeam: { key: homeTeam } }, currentComment: { betReference: { slicesBet: betSize, key: betTeam } },
    } = this.props;
    console.log(this.props.gameDetails);
    // console.log(betTeam, betSize);
    return (
      <div className="comment-container">
        <div className="comment-card">
          <div className="comment-header">
            <div className="comment-user-info">
              <img className="comment-user-avatar" src={UserAvatar} alt="profilepic" />
              <span className="username">
                {this.props.currentComment.owner}
              </span>
            </div>

            <div className="comment-bet">
              <span>
                <img className="coment-pizza-icon" id="pizzaSlice" src={PizzaSlice} alt="pizza slice" />
                {betSize}
              </span>
              <img className="comment-arrow-icon" src={Arrow} alt="Arrow icon" />
              <span>
                <img className="comment-user-avatar" src={betTeam === awayTeam ? gameDetails.awayTeam.logo : gameDetails.homeTeam.logo} alt="logo of the team user bet on" />
              </span>
            </div>
          </div>
          <div className="comment-body">
            <p className="comment-text">
              {currentComment.text}
            </p>
          </div>


          {/* <div className="comment-body">
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
          </div> */}
        </div>
        <div className="reply-container">
          {this.state.replies
            .map((reply, i) => <Reply currentReply={reply} key={i} />)}
        </div>
        {/* <form className="reply-input-container">
          <textarea rows="6" cols="20" id="reply-input-text" className="reply-input" type="text" name="reply-text" />
          <input
            type="button"
            onClick={async () => {
              await postReplyHandler(document.getElementById('reply-input-text').value, this.props.currentComment._id);
            }}
            value="Submit"
          />
        </form> */}
      </div>
    );
  }
}

export default Comments;
