import React from 'react';
import PizzaSlice from '../images/pizza-slice.svg';
import UserAvatar from '../images/user-avatar.svg';
import replyIcon from '../images/reply.svg';
import '../styles/Comments.css';
// import Reply from './Reply.js';
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
      
      <span className="comment-time-ago">
        <span className="divider-circle" />
        {timeAgo(currentComment.createdAt)} ago
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

export const CommentFooter = ({ comment, comment: { votes }, commentIsReply, context: { state: { isLoggedIn }, showModal }, showReplyInputField, userUpvoted, userDownvoted, upVote, downVote }) => {
  return (
    <div className="comment-footer">
    <div className="comment-footer-actions">
      {!commentIsReply &&
        <button type="button" className="comment-reply-button comment-footer-item" onClick={showReplyInputField}><img src={replyIcon} className="comment-reply-icon"/>Reply</button>
      }
      <span className='comment-vote-btn comment-footer-item' onClick={() => isLoggedIn ? upVote(comment._id) : showModal('Please log in to upvote this comment') }>
        <span className={`comment-vote-icon ${userUpvoted ? 'active-vote' : ''}`}>👍</span>
        {votes.up.length}
      </span>
      <span className='comment-vote-btn comment-footer-item' onClick={() => isLoggedIn ? downVote(comment._id) : showModal('Please log in to downvote this comment') }>
        <span className={`comment-vote-icon ${userDownvoted ? 'active-vote' : ''}`}>👎</span>
        {votes.down.length}
      </span>
    </div>
    <div className="comment-reply-button-container">
    </div>
  </div>
  )
}


class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      replies: [{
        votes: {
          up: 0,
          down: 0,
        }
      }],
      replyText: '',
      showReplies: false,
      showReplyInputField: false,
      lastReplyHeight: 0,
      votes: {
        up: 0,
        down: 0,
      },
      userUpvoted: false,
      userDownvoted: false,
    };
    this.replyField = React.createRef();
    this.replyInputContainer = React.createRef();

    this.replyContainer = React.createRef(); 

    this.toggleReplies = this.toggleReplies.bind(this);
  }

  /**
  * If current logged in user has voted on comment, it sets state respective to which vote the user gave (down/up)
   * @param [String] UserId 
   * @augments Comment.userUpvoted through setState
   * @augments Comment.userDownvoted through setState
   */
  setActiveVote = (userId) => {
    const { currentComment: { votes: { up, down } } } = this.props;
    if (up.includes(userId)) {
      this.setState({ userUpvoted: true });
    } else if (down.includes(userId)) {
      this.setState({ userDownvoted: true });
    }
  }

  componentDidMount() {
    const { currentComment: { votes, replies }, context } = this.props;
    this.setState({ replies: replies , votes: votes });
    this.setActiveVote(context.getUserData('_id'));

    // For replies
    if (this.props.isLastReply) {
      const replyContainerHeight = this.replyContainer.current.offsetHeight;
      this.props.adjustReplyLineHeight(replyContainerHeight / 2)
    }
  }

  componentDidUpdate(prevProps, prevState) {
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

  downVote = (commentId) => {
    // Register upvote in DB or remove upvote if user clicks upvote again
    if (this.state.votes.down.includes(this.props.context.state.user._id)) {
      axios.delete(`${process.env.REACT_APP_SERVER_URL}/comments/${commentId}/votes/down`, { headers: { authorization: `Bearer ${getUserToken()}`}}).then(response => this.setState({ votes: response.data.updatedComment.votes, userDownvoted: false }));
    } else {
      axios.post(`${process.env.REACT_APP_SERVER_URL}/comments/${commentId}/votes/down`, null, { headers: { authorization: `Bearer ${getUserToken()}`}}).then(response => this.setState({ votes: response.data.updatedComment.votes, userDownvoted: true, userUpvoted: false, }));
    }
  }

  // Register upvote in DB or remove upvote if user clicks upvote again
  upVote = (commentId) => {
    const { rootCommentId, replyId } = this.props;

    // If the comment is a reply
    if (this.props.commentIsReply) {
      if (this.state.votes.up.includes(this.props.context.state.user._id)) {
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/comments/${rootCommentId}/replies/${replyId}/votes/up`, { headers: { authorization: `Bearer ${getUserToken()}`}}).then(response => this.setState({ votes: response.data.updatedComment.votes, userUpvoted: false }));
      } else {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/comments/${rootCommentId}/replies/${replyId}/votes/up`, null, { headers: { authorization: `Bearer ${getUserToken()}`}}).then(response => this.setState({ votes: response.data.updatedComment.votes, userUpvoted: true, userDownvoted: false, }));
      }
    // If the comment is a root comment
    } else {
      if (this.state.votes.up.includes(this.props.context.state.user._id)) {
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/comments/${commentId}/votes/up`, { headers: { authorization: `Bearer ${getUserToken()}`}}).then(response => this.setState({ votes: response.data.updatedComment.votes, userUpvoted: false }));
      } else {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/comments/${commentId}/votes/up`, null, { headers: { authorization: `Bearer ${getUserToken()}`}}).then(response => this.setState({ votes: response.data.updatedComment.votes, userUpvoted: true }));
      }
    }
  }



  render() {
    const { currentComment, gameDetails, gameDetails: { awayTeam: {logo: awayLogo, key: awayTeamKey, primaryColor: awayColor }, homeTeam: { logo: homeLogo, primaryColor: homeColor } }, gameThreadBets, context, commentIsReply } = this.props;
    const { replies, showReplies, showReplyInputField, votes: { up: upVotes, down: downVotes }, userDownvoted, userUpvoted} = this.state;
    // const { state: { isLoggedIn }, showModal } = context;
    return (
      <div className={`${commentIsReply ? 'reply-container' : ''}`} >
          <div className={`${commentIsReply ? 'reply-horizontal-line' : ''}`} />
          <div className="comment-container" >
            <div className={`${commentIsReply ? 'reply-card' : 'comment-card'} card`} ref={this.props.isLastReply ? this.replyContainer : ''}>

              <CommentHeader 
                currentComment={currentComment} 
                awayColor={awayColor} 
                homeColor={homeColor} 
                awayTeamKey={awayTeamKey} 
                userBet={gameThreadBets[currentComment.owner]} 
                awayLogo={awayLogo} 
                homeLogo={homeLogo}
              />

              <div className="comment-body">
                <p className="comment-text">
                  {currentComment.text}
                </p>
              </div>

              <CommentFooter 
                commentIsReply={commentIsReply}
                isLoggedIn={this.props.context.isLoggedIn}
                context={this.props.context}
                comment={currentComment}
                showReplyInputField={this.showReplyInputField}
                userUpvoted={userUpvoted}
                userDownvoted={userDownvoted}
                context={context}
                upVotes={upVotes}
                downVotes={downVotes}
                upVote={this.upVote}
                downVote={this.downVote}
              />
              
            </div>
            {replies && replies.length > 0
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
        {!commentIsReply && showReplies
        && 
        <>
        <div className="comment-replies-container" style={{ '--last-reply-height': this.state.lastReplyHeight }}>
        {replies.map((reply, i) => 
          <Comment 
            commentIsReply={true}
            currentComment={reply}
            gameDetails={gameDetails}
            key={reply._id}
            getUpdatedComments={this.props.getUpdatedComments}
            gameThreadBets={gameThreadBets}
            context={this.props.context}
            votes={reply.votes}
            isLastReply={i === replies.length - 1 ? true : false}
            adjustReplyLineHeight={this.adjustReplyLineHeight}
            rootCommentId={currentComment._id}
            replyId={reply._id}
          />
        )}
        </div>
        </>
        }
      </div>
      </div>
    );
  }
}

export default props => (
  <UserContext.Consumer>
    {context => <Comment {...props} context={context} />}
  </UserContext.Consumer>
);
