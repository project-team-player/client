import React from 'react';
import '../styles/GameThread.css';
import axios from 'axios';
import TeamChoice from './TeamChoice';
import Slider from './Slider';
import Comments from './Comments';
import BetForm from './BetForm';
import { UserContext } from '../contexts/UserContext';
import { getUserToken } from '../utils/auth';

class GameThread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      condition: false,
      comments: [],
      bet: {
        winningTeam: '',
        slices: 0,
        comment: ''
      },
      errorMessage: '',
      disableCommenting: true,
      promptUserToLogIn: false,
      //Percentages for Sauce Indicator
      percentages: {
        awayTeam: 0,
        homeTeam: 0
      },
      finished: false,
    };
  }

  componentDidMount() {
    // TODO: Fix error, where the user can't see comments when logging out and logging back in.
    const { showModal } = this.props;
    if (showModal) {
      this.setState({ isVisible: true });
    }
    this.getPercentage();
    this.getListOfComments().then(() => {
      const gameIsFinished = () => {
        if (Date.now() > new Date(`${this.props.gameDetails.dateTime}`)) {
          return true
        }
        return false;
      }
  
      if (gameIsFinished()) {
        this.setState({ finished: true });
      } else {
        let disableCommenting = false;
        let promptUserToLogIn = false;
        if (this.props.context.state.isLoggedIn) {
          console.log('user is logged in.....');
          console.log(this.state.comments);
          if (this.userHasPlacedBet(this.state.comments)) { 
            console.log('user has placed bets');
            disableCommenting = true;
          }
        } else if (!this.props.context.state.isLoggedIn) {
          promptUserToLogIn = true;
        }
        this.setState({
            disableCommenting,
            promptUserToLogIn
        })
      }
    })
    

    
  }

  componentDidUpdate(prevProps) {
    if (prevProps.context.state.isLoggedIn === false && this.props.context.state.isLoggedIn === true){
      this.setState({ promptUserToLogIn: false })
      if (this.userHasPlacedBet(this.state.comments)) {
        this.setState({ disableCommenting: true })
      }
    }
    if (prevProps.context.state.isLoggedIn === true && this.props.context.state.isLoggedIn === false){
      this.setState({ promptUserToLogIn: true })
    }
    if (this.state.fetchNewComment) {
      this.getListOfComments();
      this.setState({
        disableCommenting: true,
        fetchNewComment: false,
      })
    }
  }

  userHasPlacedBet(comments) {
    const { user } = this.props.context.state;
    comments.forEach(comment => {
      comments[comment._id] = true;
    })
    let userComments = [];
    if (user) {
      userComments = user.comments;
    } 

    const userCommentsOnThread =
      userComments.filter(comment => {
        if (comments[comment]) {
          return true;
        }
      }).length || false;

    if (userCommentsOnThread) return true;
    return false;
  }

  getListOfComments = () => {
    return axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/comments/all/gamethread/${this.props.gameDetails.gameThreadReference.gameThreadID}`
      )
      .then(response => {
        this.setState({
          comments: response.data.comments,
          commentOwner: response.data.owner,
          commentText: response.data.text,
          createdBy: response.data.createdAt
      })
      });
  };

  setCurrentComment = async comment => {
    await this.setState({ currentComment: comment });
  };

  handleBetChanges = e => {
    const bet = { ...this.state.bet };
    const { gameDetails } = this.props;
    switch (e.target.name) {
      case 'winning-team-home':
        bet.winningTeam = gameDetails.homeTeam.key;
        break;
      case 'winning-team-away':
        bet.winningTeam = gameDetails.awayTeam.key;
        break;
      case 'pizza-slices':
        bet.slices = e.target.value;
        break;
      case 'comment':
        bet.comment = e.target.value;
        break;
      default:
        break;
    }
    this.setState({ bet });
    e.preventDefault();
  };

  makeGameBet = e => {
    const { bet: { winningTeam, slices, comment}} = this.state;
    // pass the following in body: { slices, comment winningTeam, dateTime }
    // dateTime is the time of the game, used to check if game has finished
    if ( winningTeam && slices && comment) {
      const { _id, slug, dateTime, gameThreadReference: { objectReference } } = this.props.gameDetails;
      console.log(_id, slug, dateTime, objectReference);
      const { bet: { winningTeam, slices ,comment} } = this.state;
      axios({ method: 'POST', url: `${process.env.REACT_APP_SERVER_URL}/bets/gamethread/${slug}`, headers: { authorization: `Bearer ${getUserToken()}`}, data: { key: winningTeam, slices, comment, dateTime, gamethreadId: objectReference, teamId: _id}}).then(res => {
        this.setState({ fetchNewComment: true });
      }).catch(error => {
        this.setState({ errorMessage: 'This game has either finished or you have all ready bet on it.' })
      });
    } else {
      this.setState({ errorMessage: 'Please select all the options before submitting bet!'})
    }
    e.preventDefault();
  };

  // Method to obtain sauce percentages
  getPercentage = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/gamethreads/${this.props.gameDetails.gameThreadReference.gameThreadID}`
      )
      .then(response => {
        this.setState({
          percentages: {
            awayTeam: response.data.percentages[
              this.props.gameDetails.awayTeam.key
            ].toFixed(2),
            homeTeam: response.data.percentages[
              this.props.gameDetails.homeTeam.key
            ].toFixed(2)
          }
        });
      });
  };

  // Method to post replies
  postReply = (text, commentId) => {
    console.log(commentId);
    const username = this.props.context.state.user.name;
    const gravatar = "https://gravatar.com/avatar/f6a0a196d76723567618b367b80d8375?s=200";

     axios({ method: 'PATCH', url: `${process.env.REACT_APP_SERVER_URL}/comments/reply/${commentId}`, 
      headers: { authorization: `Bearer ${getUserToken()}`},
      data: { username, gravatar, text }
    })

    .then(response => {
      this.getListOfComments();

    });
  }

  render() {
    const { showModal } = this.props;
    const { disableCommenting, promptUserToLogIn, errorMessage, finished } = this.state;
    if (!showModal) {
      return <></>;
    }
    return (
      <UserContext.Consumer>
      {context => (
        <div className="game-thread">
          <nav className="game-thread-nav">
            <div className="backbuttonDude">
              <button
                className="game-thread-close-btn"
                onClick={this.props.closeGameThread}
              >
                {"<<< Back to Games List"}
              </button>
            </div>

            <ul className="game-thread-nav-items">
            {/* 
            TODO: Implement tabs 
            */}
              {/*
              <li className="game-thread-nav-item">
                TODO: Make buttons because no href
                <a>Discussion</a>
              </li>
              <li className="game-thread-nav-item">
                TODO: Make buttons because no href
                <a>Players</a>
              </li>
              <li className="game-thread-nav-item">
                TODO: Make buttons because no href
                <a>Standings</a>
              </li>
              */}
            </ul>
          </nav>

        <div className='game-thread-content'>
          <div className='teams'>
            <div className='logoContainer'>
              <img
                className='teamLogo'
                src={this.props.gameDetails.awayTeam.logo}
                alt='logo'
              />
            </div>
            <div className='team-text'>
              <span className='team-name'>
                {this.props.gameDetails.awayTeam.name}
              </span>
              <span className='vs'>VS</span>
              <span className='team-name'>
                {this.props.gameDetails.homeTeam.name}
              </span>
            </div>
            <div className='logoContainer'>
              <img
                className='teamLogo'
                src={this.props.gameDetails.homeTeam.logo}
                alt='alt'
              />
            </div>
            </div>

          <div className='predictions'>
            <h2>Who's Got Sauce?</h2>
            <div className='prediction-counter'>
              {/* Just use template literals with the prediction value as width to change poll */}
              <div
                className='away-team-prediction'
                style={{
                  width: 
                    this.state.percentages.awayTeam < 1
                      ? ``
                      : `${this.state.percentages.awayTeam}%`,
                  backgroundColor: `#${this.props.gameDetails.awayTeam.primaryColor}`
                }}
              >
                <span>{this.state.percentages.awayTeam}%</span>
              </div>
               {/* Just use template literals with the prediction value as width to change poll */}
                <div
                  className='home-team-prediction'
                  style={{
                    width:
                      this.state.percentages.homeTeam < 1
                        ? ``
                        : `${this.state.percentages.homeTeam}%`,
                    backgroundColor: `#${this.props.gameDetails.homeTeam.primaryColor}`
                  }}
                >
                  <span>{this.state.percentages.homeTeam}%</span>
                </div>
              </div>
            </div>

            <BetForm 
              makeGameBet={this.makeGameBet} 
              gameDetails={this.props.gameDetails}
              handleBetChanges={this.handleBetChanges}
              />

            <div className="discussion-container">
            { !disableCommenting && !promptUserToLogIn &&
              <>
                <h2>Place Your Slices On Your Favorite Team</h2>
              </>
              }
              {
                promptUserToLogIn &&
                <>
                  <span className="login-text">Please log in  to join the conversation</span>
                  <button className="login-button" onClick={context.showModal}>Log in</button>
                </>
              }
                {
                  disableCommenting && !promptUserToLogIn && !finished &&
                  <p>You have allready bet pizza slices on this game. You can only bet once per game</p>
                }
                {
                  finished &&
                  <p>This game has finished. Please bet on another game.</p>
                }
              <h2>Discussion</h2>
              <hr />

              <div className="comments">
                {this.state.comments
                  .map((comment, i) => <Comments currentComment={comment} key={i} postReplyHandler={this.postReply} replies={comment.replies} />)
                  .filter(
                    comment =>
                      comment.props.currentComment.slug ===
                      this.props.gameDetails.slug
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
      </UserContext.Consumer>
    );
  }
}

export default props => (
  <UserContext.Consumer>
    {context => <GameThread {...props} context={context} />}
  </UserContext.Consumer>
);