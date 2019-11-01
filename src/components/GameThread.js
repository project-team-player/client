import React from "react";
import "../styles/GameThread.css";
import axios from "axios";
import Comment from "./Comment";
import BetForm from "./BetForm";
import { UserContext } from "../contexts/UserContext";
import { getUserToken } from "../utils/auth";
import GameHeader from "../components/GameHeader";
import UserPredictions from "./UserPredictions";
import CommentInput from "./CommentInput";
import ReactGA from "react-ga";

class GameThread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      condition: false,
      comments: [],
      bet: {
        winningTeam: "",
        slices: 0,
        comment: ""
      },
      betErrorMessage: "",
      disableCommenting: true,
      promptUserToLogIn: false,
      //Percentages for Sauce Indicator
      percentages: {
        awayTeam: 50.0,
        homeTeam: 50.0
      },
      gameHasFinished: false,
      userDidBet: false,
      userBet: ""
    };
  }

  // Using async to wait for api call to finish.
  componentDidMount = async () => {
    try {
      const { showModal } = this.props;
      if (showModal) {
        this.setState({ isVisible: true });
      }
      // API call to get gamethread data like comments, bets etc.
      const gameThreadRequest = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/gamethreads/${this.props.gameDetails.gameThreadReference.gameThreadID}`
      );
      const { gamethread, percentages } = gameThreadRequest.data;
      const { comments, bets, dateTime } = gamethread;

      const betsWithKeys = this.getBetsObjWithKeys(bets);

      let userDidBet = false;
      let userBet = {};

      // check if user is logged in
      if (this.props.context.state.isLoggedIn) {
        // Check if user has bet on current game
        const bet = this.getUserBet(betsWithKeys).bet;

        // If user has bet on current game, add bet in state
        if (bet) {
          userBet = bet;
          userDidBet = true;
        }
      }

      // Set state based on data from api call, like comments, bets etc.
      this.setState({
        comments,
        userDidBet,
        userBet,
        bets: betsWithKeys,
        percentages: {
          awayTeam: percentages[this.props.gameDetails.awayTeam.key].toFixed(2),
          homeTeam: percentages[this.props.gameDetails.homeTeam.key].toFixed(2)
        },
        gameHasFinished: new Date(dateTime) < Date.now()
      });
    } catch (error) {
      // TODO: Replace with proper error handling
    }
  };

  componentDidUpdate(prevProps) {
    const { bets } = this.state;

    // When user adds new comment, get new comments from server and rerender list of comments
    if (this.state.fetchNewComment) {
      this.getListOfComments();
      this.setState({
        fetchNewComment: false
      });
    }

    // Get percentages
    if (this.state.fetchPercentages) {
      this.getPercentages();
    }

    // If the user logs out and logs in with another user right away, make sure to clear old user bet.
    if (
      prevProps.context.state.user.name !== this.props.context.state.user.name
    ) {
      let userDidBet = false;
      let userBet = {};

      // check if user is logged in
      if (this.props.context.state.isLoggedIn) {
        const bet = this.getUserBet(bets).bet;
        if (bet) {
          userBet = bet;
          userDidBet = true;
        }
        this.setState({ userDidBet, userBet });
      }
    }

    // If a user logs out, make sure to remove any logged in user bets in order to display bet form
    if (
      prevProps.context.state.user.name &&
      !this.props.context.state.user.name
    ) {
      let userDidBet = false;
      let userBet = {};
      this.setState({ userDidBet, userBet });
    }
  }

  /**
   * Gets a bet related to a user and sets username as key
   * @param {Array} Bets An array of user bets related to gamethread
   * @returns {Object} An object with the bet information
   */
  getBetsObjWithKeys = bets => {
    const userBets = bets.reduce((obj, item) => {
      obj[item.owner.name] = item;
      return obj;
    }, {});

    return userBets;
  };

  /**
   * Compares all current user bets with the ones on the current game thread to check if the user has previously made a bet on the gamethread.
   * @param {array} bets defaults to the array of bets in state.
   * @returns {Object} The property bet will either contain the user bet for current game thread, or false, to indicate no bet on the thread.
   */
  getUserBet = (bets = this.state.bets) => {
    const { name: username } = this.props.context.state.user;

    if (bets[username]) {
      return { bet: bets[username] };
    } else {
      return { bet: false };
    }
  };

  // Gets all comments for current game thread from API and updates comments in state.
  getListOfComments = () => {
    return axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/comments/all/gamethread/${this.props.gameDetails.gameThreadReference.gameThreadID}`
      )
      .then(response => {
        this.setState({
          comments: response.data.comments
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
      case "winning-team-home":
        bet.winningTeam = gameDetails.homeTeam.key;
        break;
      case "winning-team-away":
        bet.winningTeam = gameDetails.awayTeam.key;
        break;
      //** Seperate function created for slices being bet refer to handleSliceChanges */
      // case 'pizza-slices':
      //   bet.slices = e.target.value;
      //   break;
      case "comment":
        bet.comment = e.target.value;
        break;
      default:
        break;
    }
    this.setState({ bet });
    e.preventDefault();
  };

  /**
   * Commits user bet to API and sets user bet in both the User Context and local state. It also sets an appropriate error message that the Bet Form component uses to display any missing data when making a bet.
   * @returns {Undefined}
   */
  makeGameBet = () => {
    ReactGA.event({
      category: "UserMadeBet",
      action: "User made a bet on a Game Thread."
    });
    const {
      bet: { winningTeam, slices }
    } = this.state;
    // pass the following in body: { slices, comment winningTeam, dateTime }
    // dateTime is the time of the game, used to check if game has finished
    if (
      winningTeam &&
      slices &&
      this.props.context.state.user.pizzaSlicesWeekly - slices >= 0
    ) {
      const {
        _id,
        slug,
        dateTime,
        gameThreadReference: { objectReference }
      } = this.props.gameDetails;
      const {
        bet: { winningTeam, slices }
      } = this.state;

      // Api POST call to create a new bet
      axios({
        method: "POST",
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
        .then(res => {
          const { _id, slicesBet, key } = res.data.bet;
          const {
            addUserBet,
            updateUserSlices,
            state: {
              user: { name: username }
            }
          } = this.props.context;
          const bets = { ...this.state.bets };
          // Sets state with the bet made by the user
          this.setState({
            userDidBet: true,
            userBet: { slicesBet, key },
            betErrorMessage: ""
          });

          // Updates the user context to reflect loss of pizza slices
          this.props.context.updateUserSlices(slices);

          // Adds the new bet to the other user bets made by user in User Context. Is used to disable further betting etc.
          this.props.context.addUserBet({ _id, key, slicesBet });

          // Adds the new bet to the bets in state and recalculate user percentages
          bets[username] = { _id, key, slicesBet };
          this.setState({ bets, fetchPercentages: true });
        })
        .catch(error => {
          this.setState({
            betErrorMessage:
              "Something is not working like it should. Please contact us at teamplayer4321234@gmail.com for assistance."
          });
        });
    } else {
      // Display a relevant error message to the user based on their bet form input.
      let betErrorMessage = "";
      if (this.props.context.state.user.pizzaSlicesWeekly === 0) {
        betErrorMessage =
          "You're out of pizza slices. Hang on for a fresh batch next week!";
      } else if (this.props.context.state.user.pizzaSlicesWeekly - slices < 0) {
        betErrorMessage = "You don't have enough slices for this bet.";
      } else if (!slices && !winningTeam) {
        betErrorMessage = "Please select amount of slices and a winning team.";
      } else if (!slices) {
        betErrorMessage =
          "Please select amount of slices above 0 to bet on this game.";
      } else if (!winningTeam) {
        betErrorMessage = "Please select a winning team for this game.";
      } else {
        betErrorMessage =
          "Something is not working like it should. Please contact us at teamplayer4321234@gmail.com for assistance.";
      }
      this.setState({
        betErrorMessage
      });
    }
  };

  // Method to obtain percentages for pie chart
  getPercentages = async () => {
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
          },
          fetchPercentages: false
        });
      });
  };

  // Method to post replies
  postReply = (text, commentId) => {
    const username = this.props.context.state.user.name;
    const gravatar =
      "https://gravatar.com/avatar/f6a0a196d76723567618b367b80d8375?s=200";

    axios({
      method: "PATCH",
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
      betErrorMessage,
      bets,
      userDidBet,
      userBet,
      gameHasFinished
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
                    <strong>&larr;</strong> Back to Games
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
                <section className="game-thread-main">
                  <GameHeader gameDetails={this.props.gameDetails} />
                  <BetForm
                    makeGameBet={this.makeGameBet}
                    gameDetails={this.props.gameDetails}
                    handleBetChanges={this.handleBetChanges}
                    handleSliceChanges={this.handleSliceChanges}
                    userDidBet={userDidBet}
                    userBet={userBet}
                    gameHasFinished={gameHasFinished}
                    errorMessage={betErrorMessage}
                  />
                  <div className="discussion-container card">
                    <h2>Trash talk</h2>
                    <CommentInput
                      gamethreadSlug={gameDetails.slug}
                      gamethreadId={
                        gameDetails.gameThreadReference.gameThreadID
                      }
                      fetchNewComments={() =>
                        this.setState({ fetchNewComment: true })
                      }
                    />

                    <div className="comments">
                      {this.state.comments.map((comment, i) => (
                        <Comment
                          currentComment={comment}
                          gameDetails={gameDetails}
                          key={i}
                          postReplyHandler={this.postReply}
                          replies={comment.replies}
                          getUpdatedComments={this.getListOfComments}
                          gameThreadBets={bets}
                        />
                      ))}
                    </div>
                  </div>
                </section>

                <aside className="game-thread-aside">
                  <UserPredictions
                    gameDetails={this.props.gameDetails}
                    percentages={this.state.percentages}
                  />
                </aside>
              </div>
            </div>
            <div
              className="clickableBackground"
              onClick={this.props.closeGameThread}
            />
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
