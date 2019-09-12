import React from "react";
import "../styles/GameThread.css";
import TeamChoice from "./TeamChoice";
import Slider from "./Slider";
import axios from "axios";
import Comments from "./Comments";
import { UserContext } from "../contexts/UserContext";
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
      //Percentages for Sauce Indicator
      percentages: {
        awayTeam: 0,
        homeTeam: 0,
      }
    };
  }

  componentDidMount() {
    const { showModal } = this.props;
    if (showModal) {
      this.setState({ isVisible: true });
    }
    this.getListOfComments().then(data => {
      let disableCommenting = false;
      if (this.context.state.isLoggedIn) {
        if (this.userHasPlacedBet(data.comments)) { 
          disableCommenting = true;
        }
      }
      this.setState({
          comments: data.comments,
          commentOwner: data.owner,
          commentText: data.text,
          createdBy: data.createdAt,
          disableCommenting
      })
    });
    this.getPercentage();
  }

  componentDidUpdate() {
    if (this.state.fetchNewComment) {
      this.getListOfComments()
        .then(data => {
          this.setState({
            comments: data.comments,
            commentOwner: data.owner,
            commentText: data.text,
            createdBy: data.createdAt,
            disableCommenting: true,
          })
      })
    }
  }

  userHasPlacedBet(comments) {
    comments.forEach(comment => {
      comments[comment._id] = true;
    })
    const userComments = this.context.state.user.comments;
    console.log(userComments);

    const userCommentsOnThread = userComments.filter(comment => {
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
      .then(response => response.data);
  };

  setCurrentComment = async comment => {
    await this.setState({ currentComment: comment });
  };

  handleBetChanges = (e) => {
    const bet = {...this.state.bet};
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
  }

  makeGameBet = (e) => {
    // pass the following in body: { slices, comment winningTeam, dateTime }
    // dateTime is the time of the game, used to check if game has finished
    console.log('making game bet');
    const { _id, slug, dateTime, gameThreadReference: { objectReference } } = this.props.gameDetails;
    const { bet: { winningTeam, slices ,comment} } = this.state;
    axios({ method: 'POST', url: `${process.env.REACT_APP_SERVER_URL}/bets/gamethread/${slug}`, headers: { authorization: `Bearer ${getUserToken()}`}, data: { key: winningTeam, slices, comment, dateTime, gamethreadId: objectReference, teamId: _id}}).then(res => {
      this.setState({ fetchNewComment: true });
    }).catch(error => {
      this.setState({ errorMessage: error.message })
    });
    e.preventDefault();
  }

  // Method to obtain sauce percentages
  getPercentage = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/gamethreads/${this.props.gameDetails.gameThreadReference.gameThreadID}`
      )
      .then((response) => {
        this.setState({ percentages: {
          awayTeam: response.data.percentages[this.props.gameDetails.awayTeam.key],
          homeTeam: response.data.percentages[this.props.gameDetails.homeTeam.key]
        }
        });
      });
  }

  render() {
    const { showModal } = this.props;
    const { disableCommenting } = this.state;
    if (!showModal) {
      return <></>;
    }
    return (
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

        <div className="game-thread-content">
          <div className="teams">
            <div className="logoContainer">
              <img
                className="teamLogo"
                src={this.props.gameDetails.awayTeam.logo}
                alt="logo"
              />
            </div>
            <div className="team-text">
              <span className="team-name">
                {this.props.gameDetails.awayTeam.name}
              </span>
              <span className="vs">VS</span>
              <span className="team-name">
                {this.props.gameDetails.homeTeam.name}
              </span>
            </div>
            <div className="logoContainer">
              <img
                className="teamLogo"
                src={this.props.gameDetails.homeTeam.logo}
                alt="alt"
              />
            </div>
          </div>

          <div className="predictions">
            <h2>Who's Got Sauce?</h2>
            <div className="prediction-counter">
              {/* Just use template literals with the prediction value as width to change poll */}
              <div className="away-team-prediction" style={{ width: `${this.state.percentages.awayTeam}%`, backgroundColor: `#${this.props.gameDetails.awayTeam.primaryColor}`}}>
                <span>{this.state.percentages.awayTeam}%</span>
              </div>
              {/* Just use template literals with the prediction value as width to change poll */}
              <div className="home-team-prediction" style={{ width: this.state.percentages.homeTeam !== 0 ? `${this.state.percentages.homeTeam}%` : '', backgroundColor: `#${this.props.gameDetails.homeTeam.primaryColor}`}}>
                <span>{this.state.percentages.homeTeam}%</span>
              </div>
            </div>
          </div>

          <div className="discussion-container">
          { !disableCommenting ?
            <>
              <h2>Place Your Slices On Your Favorite Team</h2>
              <hr />
              <form onSubmit={this.makeGameBet}>
                <div className="betting-container">
                  <TeamChoice gameDetails={this.props.gameDetails} handleBetChanges={this.handleBetChanges} />

                  <div className="slice-allocation">
                    <h3>2. Place Your Slices</h3>
                    <div className="bet-size-slider">
                      {/* <img src={PizzaWheel} /> */}
                      {/* <input type="range" min="1" max="8" /> */}
                      {/* <span className="bet-size-indicator">8</span> */}
                      <Slider handleBetChanges={this.handleBetChanges}/>
                    </div>
                  </div>

                  <div className="comment-input">
                    <h3>3. Throw A Cheesy Comment</h3>
                    <textarea
                      type="text"
                      name="comment"
                      className="input-comment-field"
                      onChange={this.handleBetChanges}
                    />
                    <button className="button">Slice It</button>
                  </div>
                </div>
              </form>
            </>
            :
            <p>You have all ready bet pizza slices on this game. You can only bet once per game</p>
            
            }
            <h2>Discussion</h2>
            <hr />

            <div className="comments">
              {this.state.comments
                .map((comment, i) => <Comments currentComment={comment} key={i} />)
                .filter(
                  comment =>
                    comment.props.currentComment.slug ===
                    this.props.gameDetails.slug
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GameThread.contextType = UserContext;

export default GameThread;
