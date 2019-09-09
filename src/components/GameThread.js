import React from "react";
import "../styles/GameThread.css";
import TeamChoice from "./TeamChoice";
import Slider from "./Slider";
import axios from "axios";
import Comments from "./Comments";
import { AuthContext } from "../contexts/UserContext";

// helpers
import { convertDate } from '../utils/helpers.js';

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
      }
      // currentComment: "",
      // commentOwner: "",
      // commentText: "",
      // createdBy: ""
    };
  }

  componentDidMount() {
    const { showModal } = this.props;
    console.log("game thread mounting");
    if (showModal) {
      this.setState({ isVisible: true });
    }
    this.getListOfComments();
    console.log(this.props.gameDetails);
  }

  getListOfComments = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/comments/all/gamethread/${this.props.gameDetails.gameThreadReference.gameThreadID}`
      )
      .then(response => {
        this.setState({
          comments: response.data.comments,
          commentOwner: response.data.owner,
          commentText: response.data.text,
          createdBy: response.data.createdAt
        });
      });
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
    const { _id, slug, dateTime, gameThreadReference: { objectReference } } = this.props.gameDetails;
    const { bet: { winningTeam, slices ,comment} } = this.state;
    console.log(winningTeam, slices, comment, dateTime);
    axios({ method: 'POST', url: `${process.env.REACT_APP_SERVER_URL}/bets/gamethread/${slug}`, headers: {authorization: `Bearer ${this.context.state.token}`}, data: { key: winningTeam, slices, comment, dateTime, gamethreadId: objectReference, teamId: _id}}).then(res => console.log(res));
    e.preventDefault();
  }

  render() {
    const { showModal } = this.props;
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
              <div className="home-team-prediction" style={{ width: "55%" }}>
                <span>55%</span>
              </div>
              {/* Just use template literals with the prediction value as width to change poll */}
              <div className="away-team-prediction" style={{ width: "45%" }}>
                <span>45%</span>
              </div>
            </div>
          </div>

          <div className="discussion-container">
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
                  <textArea
                    type="text"
                    name="comment"
                    className="input-comment-field"
                    onChange={this.handleBetChanges}
                  />
                  <button className="button">Slice It</button>
                </div>
              </div>
            </form>
            <h2>Discussion</h2>
            <hr />

            <div className="comments">
              {this.state.comments
                .map(comment => <Comments currentComment={comment} />)
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

// comment route
// router.get('comments/all/gamethread/:id',
// catchErrors(async(req, res) => {
//   const comments = await commentController.readMany({ gameThreadReference: req.params.id });
//   return res.status(200).json({ comments });
// })
// );

GameThread.contextType = AuthContext;

export default GameThread;
