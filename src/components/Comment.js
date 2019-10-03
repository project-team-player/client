import React from 'react';
import PizzaSlice from '../images/pizza-slice.svg';
import UserAvatar from '../images/user-avatar.svg';
import Arrow from '../images/arrow.svg';
import '../styles/Comments.css';
import Reply from './Reply.js';


class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      replies: [],
      showReplies: false,
    };

    this.toggleReplies = this.toggleReplies.bind(this);
  }

  componentWillMount() {
    this.setState({ replies: this.props.currentComment.replies });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.replies !== this.props.replies) {
      this.setState({ replies: this.props.currentComment.replies });
    }
  }

  toggleReplies() {
    this.setState(prevState => ({ showReplies: !prevState.showReplies }));
  }

  render() {
    console.log(this.state.currentComment);
    const {
      postReplyHandler, currentComment, gameDetails, gameDetails: { awayTeam: { key: awayTeam }, homeTeam: { key: homeTeam } }, currentComment: { betReference: { slicesBet: betSize, key: betTeam } },
    } = this.props;
    const { replies, showReplies } = this.state;
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

            <div className="comment-bet" style={{ background: `#${betTeam === awayTeam ? gameDetails.awayTeam.primaryColor : gameDetails.homeTeam.primaryColor}` }}>
              <span className="comment-bet-size">
                <img className="comment-pizza-icon" id="pizzaSlice" src={PizzaSlice} alt="pizza slice" />
                {betSize}
              </span>
              <img className="comment-arrow-icon" src={Arrow} alt="Arrow icon" />
              <img className="comment-bet-team-icon" src={betTeam === awayTeam ? gameDetails.awayTeam.logo : gameDetails.homeTeam.logo} alt="logo of the team user bet on" />
            </div>
          </div>
          <div className="comment-body">
            <p className="comment-text">
              {currentComment.text}
            </p>
          </div>
          <div className="comment-footer">
            <span className="comment-time-ago">4 seconds ago</span>
            <button type="button" className="comment-reply-button">Reply</button>
          </div>
        </div>
        {replies.length > 0
        && (
        <div className="comment-under-section">
          <button type="button" className="comment-replies-toggle" onClick={this.toggleReplies}>
            {replies.length}
            {' '}
replies
          </button>
        </div>
        )
        }
        {showReplies
        && replies.map((reply, i) => <Reply currentReply={reply} key={i} gameDetails={gameDetails} />)
        }
        <form className="reply-input-container">
          <textarea rows="6" cols="20" id="reply-input-text" className="reply-input" type="text" name="reply-text" />
          <input
            type="button"
            onClick={async () => {
              await postReplyHandler(document.getElementById('reply-input-text').value, this.props.currentComment._id);
            }}
            value="Submit"
          />
        </form>
      </div>
    );
  }
}

export default Comment;
