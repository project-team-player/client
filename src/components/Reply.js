import React from 'react';
import { timeAgo } from '../utils/time';
import '../styles/Reply.css';
import '../styles/Comments.css';
import { CommentHeader, CommentFooter } from './Comment';
import { UserContext } from '../contexts/UserContext';


class Reply extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.replyContainer = React.createRef(); 
  }

  componentDidMount() {
    if (this.props.isLastReply) {
      const replyContainerHeight = this.replyContainer.current.offsetHeight;
      this.props.adjustReplyLineHeight(replyContainerHeight / 2)
    }
  }

  render() {
    const { currentReply, gameThreadBets, awayColor, homeColor, awayTeamKey, userBet, awayLogo, homeLogo, context } = this.props;
    return (
      <div className="reply-container" ref={this.replyContainer}>
        <div className="reply-horizontal-line" />
        <div className="comment-container">
          <div className="reply-card card">
            <CommentHeader 
            currentComment={currentReply} 
            awayColor={awayColor} 
            homeColor={homeColor} 
            awayTeamKey={awayTeamKey} 
            userBet={userBet} 
            awayLogo={awayLogo} 
            homeLogo={homeLogo}
            gameThreadBets={gameThreadBets} 
            />
            <div className="comment-body">
              <p className="comment-text">
                {currentReply.text}
              </p>
            </div>
            {/* <div className="comment-footer">
              <span className="comment-time-ago">{timeAgo(currentReply.createdAt)} ago</span>
            </div> */}
            <CommentFooter 
                commentIsReply={true}
                isLoggedIn={isLoggedIn}
                comment={currentComment}
                showReplyInputField={this.showReplyInputField}
                userUpvoted={userUpvoted}
                userDownvoted={userDownvoted}
                context={context}
                upVotes={upVotes}
                downVotes={downVotes}
            />
            
          </div>
        </div>
      </div>
    );
  }
}

export default props => (
  <UserContext.Consumer>
    {context => <Reply {...props} context={context} />}
  </UserContext.Consumer>
);