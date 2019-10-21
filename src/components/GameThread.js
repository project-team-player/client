import React from 'react';
import '../styles/GameThread.css';
import axios from 'axios';
import Comment from './Comment';
// import Comments from './Comments';
import BetForm from './BetForm';
import { UserContext } from '../contexts/UserContext';
import { getUserToken } from '../utils/auth';
import GameHeader from '../components/GameHeader'
import UserPredictions from './UserPredictions';
import CommentInput from './CommentInput';

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
        awayTeam: 50.00,
        homeTeam: 50.00
      },
      gameHasFinished: false,
      userDidBet: false,
      userBet: '',
    };
  }

  componentDidMount = async () => {
    try {
      const { showModal } = this.props;
      if (showModal) {
        this.setState({ isVisible: true });
      }
      // API call to get gamethread data like comments, bets etc.
      const gameThreadRequest = await axios.get(`${process.env.REACT_APP_SERVER_URL}/gamethreads/${this.props.gameDetails.gameThreadReference.gameThreadID}`)
      const { gamethread, percentages } = gameThreadRequest.data;
      const { comments, bets, dateTime } = gamethread;

      let userDidBet = false;
      let userBet = {}

      
      // check if user is logged in
      if (this.props.context.state.isLoggedIn) {
        const bet = this.getUserBet(bets).bet;
        if (bet) { 
          userBet = bet; 
          userDidBet = true;
        }
      } 

      this.setState({ comments, bets, userDidBet, userBet,
        percentages: { 
          awayTeam: percentages[this.props.gameDetails.awayTeam.key].toFixed(2), 
          homeTeam: percentages[this.props.gameDetails.homeTeam.key].toFixed(2),
        },
        gameHasFinished: new Date(dateTime) < Date.now(),
      })
    } catch (error) {
      // TODO: Replace with proper error handling
      console.error(error)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.state.fetchNewComment) {
      this.getListOfComments();
      this.setState({
        fetchNewComment: false
      });
    }
  }

  getUserBet = (bets = this.state.bets) => {
   const userBets = this.props.context.state.user.bets;
   let bet = {};
   if (userBets.some(userBet => {
    if (bets.includes(userBet._id)) {
      bet = userBet; 
      return true;
    }
    })) {
      return { bet}
    } else {
      return { bet: false }
    }
  }

  userHasPlacedBet(comments) {
    const { user } = this.props.context.state;
    comments.forEach(comment => {
      comments[comment._id] = true;
    });
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
        });
      });
  };

  setCurrentComment = async comment => {
    await this.setState({ currentComment: comment });
  };

  handleSliceChanges = sliceValue => {
    const bet = { ...this.state.bet };
    bet.slices = sliceValue;
    this.setState({ bet });
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
      //** Seperate function created for slices being bet refer to handleSliceChanges */
      // case 'pizza-slices':
      //   bet.slices = e.target.value;
      //   break;
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
    const {
      bet: { winningTeam, slices }
    } = this.state;
    // pass the following in body: { slices, comment winningTeam, dateTime }
    // dateTime is the time of the game, used to check if game has finished
    if (winningTeam && slices) {
      const {
        _id,
        slug,
        dateTime,
        gameThreadReference: { objectReference }
      } = this.props.gameDetails;
      const {
        bet: { winningTeam, slices }
      } = this.state;
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER_URL}/bets/gamethread/${slug}`,
        headers: { authorization: `Bearer ${getUserToken()}` },
        data: {
          key: winningTeam,
          slices,
          dateTime,
          gamethreadId: objectReference,
          teamId: _id
        }
      })
        .catch(error => {
          this.setState({
            errorMessage:
              'This game has either finished or you have already betted on it.'
          });
          alert(this.state.errorMessage);
        });
    } else {
      this.setState({
        errorMessage: 'Please select all the options before submitting bet!'
      });
    }
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
    const username = this.props.context.state.user.name;
    const gravatar =
      'https://gravatar.com/avatar/f6a0a196d76723567618b367b80d8375?s=200';

    axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_SERVER_URL}/comments/reply/${commentId}`,
      headers: { authorization: `Bearer ${getUserToken()}` },
      data: { username, gravatar, text }
    }).then(response => {
      this.getListOfComments();
    });
  };

  render() {
    const { showModal, gameDetails } = this.props;
    const {
      disableCommenting,
      promptUserToLogIn,
      errorMessage,
      finished,
      userDidBet,
      userBet,
      gameHasFinished,
    } = this.state;
    if (!showModal) {
      return <></>;
    }
    return (
      <UserContext.Consumer>
      {context => (
        <div className="gameThreadContainer">
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

              <section className='game-thread-main'>
                <GameHeader gameDetails={this.props.gameDetails} />  
                <BetForm 
                makeGameBet={this.makeGameBet} 
                gameDetails={this.props.gameDetails}
                handleBetChanges={this.handleBetChanges}
                handleSliceChanges={this.handleSliceChanges}
                userDidBet={userDidBet}
                userBet={userBet}
                gameHasFinished={gameHasFinished}
                /> 
                <div className="discussion-container card">
                <h2>Trash talk</h2>
                    <CommentInput gamethreadSlug={gameDetails.slug} gamethreadId={gameDetails.gameThreadReference.gameThreadID}
                    fetchNewComments={this.getListOfComments}
                     />

                    <div className="comments">
                      {this.state.comments
                        .map((comment, i) => <Comment currentComment={comment} gameDetails={gameDetails} key={i} postReplyHandler={this.postReply} replies={comment.replies} getUpdatedComments={this.getListOfComments} />)
                        }
                    </div>
                  </div>
              </section>

              <aside className="game-thread-aside">
                <UserPredictions gameDetails={this.props.gameDetails} percentages={this.state.percentages} />
              </aside>

            </div>
          </div>
          <div className="clickableBackground" onClick={this.props.closeGameThread}/>
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
