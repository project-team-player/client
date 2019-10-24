import React from 'react';
import { timeAgo } from '../utils/time';
import '../styles/Reply.css';
import '../styles/Comments.css';
import { CommentHeader } from './Comment';

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
    const { currentReply, gameThreadBets, awayColor, homeColor, awayTeamKey, userBet, awayLogo, homeLogo } = this.props;
    console.log(currentReply);
    return (
      <div className="reply-container" ref={this.replyContainer}>
        <div className="reply-horizontal-line"></div>
        <div className="comment-container">
          <div className="reply-card">
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
            <div className="comment-footer">
              <span className="comment-time-ago">{timeAgo(currentReply.createdAt)} ago</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Reply;
