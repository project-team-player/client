import React from 'react';
import PizzaSlice from '../images/pizza-slice.svg';
import UserAvatar from '../images/user-avatar.svg';
import replyIcon from '../images/reply.svg';
import '../styles/Comments.css';
import Reply from './Reply.js';
import { UserContext } from '../contexts/UserContext';
import { getUserToken } from '../utils/auth';
import { timeAgo } from '../utils/time';
import axios from 'axios'

export const CommentHeader = ({currentComment, userBet, awayColor, homeColor, awayTeamKey, awayLogo, homeLogo}) => {

  return (
    <div className="comment-header">
    <div className="comment-user-info">
      <img className="comment-user-avatar" src={UserAvatar} alt="profilepic" />
      <span className="username">
        {currentComment.owner || currentComment.username }
      </span>
    </div>
      { userBet && 
        <div className="comment-user-bet-container" style={{ '--comment-bet-background': userBet.key === awayTeamKey ? `#${awayColor}` : `#${homeColor}` }}>
          <span className="comment-user-bet-items">
            <img src={PizzaSlice} className="comment-user-bet-pizza-slice"  />
            <span className="comment-user-bet-size">{userBet.slicesBet}</span>
            <span className="comment-user-bet-arrow">&rarr;</span> 
            <span className="comment-user-bet-team">{userBet.key}</span>
            </span>
        </div>
      }
    </div>  
  )
}


class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      replies: [],
      replyText: '',
      showReplies: false,
      showReplyInputField: false,
      lastReplyHeight: 0,
    };
    this.replyField = React.createRef();
    this.replyInputContainer = React.createRef();

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

  showReplyInputField = () => {
    if (this.props.context.state.isLoggedIn) {
      if (this.state.showReplyInputField) {
        document.removeEventListener('mousedown', this.closeReplyInputField);
      }
      this.setState(prevState => ({ showReplyInputField: !prevState.showReplyInputField }), () => {
        if (this.state.showReplyInputField) {
          this.replyField.current.focus();
          document.addEventListener('mousedown', this.closeReplyInputField);
        }
      });
    } else {
      this.props.context.showModal('Please log in to reply');
    }
  }

  closeReplyInputField = (e) => {
    if (this.replyInputContainer.current.contains(e.target) || e.target.classList.contains('comment-reply-button')) {
      return; 
    }
    
    this.setState({ showReplyInputField: false }, () => document.removeEventListener('mousedown', this.closeReplyInputField));
  }

  updateReplyText = (e) => {
    this.setState({replyText: e.target.value})
  }

  replyToComment = (commentId) => {
    const username = this.props.context.state.user.name;
    const { replyText } = this.state;
    // const gravatar = "https://gravatar.com/avatar/f6a0a196d76723567618b367b80d8375?s=200";

     axios({ method: 'PATCH', url: `${process.env.REACT_APP_SERVER_URL}/comments/reply/${commentId}`, 
      headers: { authorization: `Bearer ${getUserToken()}`},
      data: { username, text: replyText }
    })
    .then(response => {
      this.props.getUpdatedComments();
      this.setState({replyText: '', showReplyInputField: false, showReplies: true})
      document.removeEventListener('mousedown', this.closeReplyInputField);
    });
  }

  adjustReplyLineHeight = (height) => {
    this.setState({ lastReplyHeight: height });
  }

  render() {
    const { currentComment, gameDetails, gameDetails: { awayTeam: {logo: awayLogo, key: awayTeamKey, primaryColor: awayColor }, homeTeam: { logo: homeLogo, primaryColor: homeColor } }, gameThreadBets } = this.props;
    const { replies, showReplies, showReplyInputField } = this.state;
    return (
      <UserContext.Consumer>
        {context => (
          <div className="comment-container">
            <div className="comment-card">
              <CommentHeader currentComment={currentComment} awayColor={awayColor} homeColor={homeColor} awayTeamKey={awayTeamKey} userBet={gameThreadBets[currentComment.owner]} awayLogo={awayLogo} homeLogo={homeLogo} />
              <div className="comment-body">
                <p className="comment-text">
                  {currentComment.text}
                </p>
              </div>
              <div className="comment-footer">
                <span className="comment-time-ago">{timeAgo(currentComment.createdAt)} ago</span>
                <div className="comment-reply-button-container">
                  <button type="button" className="comment-reply-button" onClick={this.showReplyInputField}><img src={replyIcon} className="comment-reply-icon"/>Reply</button>
                </div>
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
            {showReplyInputField
          && (
          <div className="reply-input-container card" ref={this.replyInputContainer}>
            <div className="reply-input-header">
              <img className="comment-user-avatar" src={UserAvatar} alt="profilepic" />
              {context.state.user.username}
            </div>
            <form className="">
              <textarea rows="6" cols="20" id="reply-input-text" className="reply-input-text" type="text" name="reply-text" ref={this.replyField} value={this.state.replyText} onChange={this.updateReplyText} />
              <div className="reply-input-footer">
                <button
                  type="button"
                  onClick={() => this.replyToComment(currentComment._id)}
                  className="reply-submit-button"
                >Reply</button>
              </div>
            </form>
          </div>

          )
        }
            {showReplies
        && 
        <div className="comment-replies-container" style={{ '--last-reply-height': this.state.lastReplyHeight }}>
        {replies.map((reply, i) => 
          <Reply 
          userBet={gameThreadBets[reply.username]}
          currentReply={reply} 
          key={i} 
          gameDetails={gameDetails} 
          isLastReply={i === replies.length - 1 ? true : false} 
          adjustReplyLineHeight={this.adjustReplyLineHeight} 
          currentComment={reply} 
          awayColor={awayColor} 
          homeColor={homeColor} 
          awayTeamKey={awayTeamKey} 
          gameThreadBets
          awayLogo={awayLogo} 
          homeLogo={homeLogo}
          />)
        }
        </div>
        }
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

export default props => (
  <UserContext.Consumer>
    {context => <Comment {...props} context={context} />}
  </UserContext.Consumer>
);
