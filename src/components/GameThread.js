import React from "react";
import "../styles/GameThread.css";
import TeamChoice from "./TeamChoice";
import Slider from "./Slider";
import axios from "axios";
import Comments from "./Comments";

class GameThread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      condition: false,
      comments: []
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
  }

  getListOfComments = async () => {
    console.log("Getting List of Comments");
    await axios
      .get(
        "https://pecorina-development.herokuapp.com/comments/all/gamethread/5d5eaf9b7547cb38d40f2662"
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
            <li className="game-thread-nav-item">
              {/* TODO: Make buttons because no href */}
              <a>Discussion</a>
            </li>
            <li className="game-thread-nav-item">
              {/* TODO: Make buttons because no href */}
              <a>Players</a>
            </li>
            <li className="game-thread-nav-item">
              {/* TODO: Make buttons because no href */}
              <a>Standings</a>
            </li>
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
            <form>
              <div className="betting-container">
                <TeamChoice gameDetails={this.props.gameDetails} />

                <div className="slice-allocation">
                  <h3>2. Place Your Slices</h3>
                  <div className="bet-size-slider">
                    {/* <img src={PizzaWheel} /> */}
                    {/* <input type="range" min="1" max="8" /> */}
                    {/* <span className="bet-size-indicator">8</span> */}
                    <Slider />
                  </div>
                </div>

                <div className="comment-input">
                  <h3>3. Throw A Cheesy Comment</h3>
                  <textArea
                    type="text"
                    name="comment"
                    className="input-comment-field"
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

export default GameThread;
