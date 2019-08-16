import React from 'react';
import '../styles/GameThread.css';
import BearsLogo from '../images/bears-logo.svg';
import PatriotsLogo from '../images/patriots-logo.svg';
import PizzaWheel from '../images/pizza-wheel.svg';
import PizzaSlice from '../images/pizza-slice.svg';
import UserAvatar from '../images/user-avatar.jpg';

class GameThread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    }
  }

  componentDidMount() {
    const { showModal } = this.props;
    if (showModal) {
      this.setState({ isVisible: true });
    }
  }

  render () {
    const { isVisible } = this.state;
    if (!isVisible) {
      return (<></>);
    }
    return (
      <div className="game-thread">
        <nav className="game-thread-nav">
          <div></div>
  
          <ul className="game-thread-nav-items">
            <li className="game-thread-nav-item">
              <a>Discussion</a>
            </li>
            <li className="game-thread-nav-item">
              <a>Players</a>
            </li>
            <li className="game-thread-nav-item">
              <a>Standings</a>
            </li>
          </ul>
  
          <div>
            <button className="game-thread-close-btn">X Close</button>
          </div>
       
        </nav>
  
        <div className="game-thread-content">
        <div className="teams">
          <img src={BearsLogo} />
          <div className="team-text">
            <span className="team-name">Chicago Bears</span>
            <span className="vs">VS</span>
            <span className="team-name">New England Patriots</span>
          </div>
          <img src={PatriotsLogo} />
        </div>
  
        <div className="predictions">
          <h2>Who's Got Sauce?</h2>
          <div className="prediction-counter">
            <div className="prediction home-team-prediction"><span>25%</span></div>
            <div className="prediction away-team-prediction"><span>75%</span></div>
          </div>
        </div>
  
        <div className="discussion-container">
          <h2>Place Your Slices On Your Favorite Team</h2>
          <hr></hr>
          <form>
          <div className="betting-container">
            <div className="winner-selection">
              <h3>1. Choose Winner</h3>
              <div>
                  <input type="radio" name="winning-team" value="home-team" id="home-team-selector"  className=" bet-selector hide" checked="checked" />
                  <label for="home-team-selector" className="bet-selector-btn">CHI
                  </label>
              </div>
              <div>
                <input type="radio" name="winning-team" value="away-team" id="away-team-selector"
                  className="bet-selector hide" />
                <label for="away-team-selector" 
                className="bet-selector-btn">NE
                </label>
              </div>
            </div>
  
            <div className="slice-allocation">
              <h3>2. Place Your Slices</h3>
              <img src={PizzaWheel} />
              <div className="bet-size-slider">
                <input type="range" min="1" max="8" />
                <span className="bet-size-indicator" >8</span>
              </div>
            </div>
  
            <div className="comment-input">
              <h3>3. Throw A Cheesy Comment</h3>
              <textArea type="text" name="comment" className="input-comment-field" />
              <button className="button">Slice It</button>
            </div>
  
              </div>
            </form>
          <h2>Discussion</h2>
          <hr></hr>
          <div className="comment">
            <img className="user-avatar" src={UserAvatar} />
            <div className="comment-body">
              <div className="comment-details">
                <span className="username">ninjajon</span>
                <img src={PizzaSlice} />
                <span>5</span>
                <span> on</span>
                <img className="bet-logo" src={BearsLogo} />
                <span>5 minutes ago</span>
              </div>
              <div className="comment-text">
                <p>Tom Brady is going to take this one home!!!</p> 
              </div>
            </div>
          </div>
  
          <div className="comment">
            <img className="user-avatar" src={UserAvatar} />
            <div className="comment-body">
              <div className="comment-details">
                <span className="username">ninjajon</span>
                <img src={PizzaSlice} />
                <span>5</span>
                <span> on</span>
                <img className="bet-logo" src={BearsLogo} />
                <span>5 minutes ago</span>
              </div>
              <div className="comment-text">
                <p>Tom Brady is going to take this one home!!!</p> 
              </div>
            </div>
          </div>
  
          <div className="comment">
            <img className="user-avatar" src={UserAvatar} />
            <div className="comment-body">
              <div className="comment-details">
                <span className="username">ninjajon</span>
                <img src={PizzaSlice} />
                <span>5</span>
                <span> on</span>
                <img className="bet-logo" src={BearsLogo} />
                <span>5 minutes ago</span>
              </div>
              <div className="comment-text">
                <p>Tom Brady is going to take this one home!!!</p> 
              </div>
            </div>
          </div>
  
          <div className="comment">
            <img className="user-avatar" src={UserAvatar} />
            <div className="comment-body">
              <div className="comment-details">
                <span className="username">ninjajon</span>
                <span> 5</span>
                <img src={PizzaSlice} />
                <span> on</span>
                <img className="bet-logo" src={BearsLogo} />
                <span> 5 minutes ago</span>
              </div>
              <div className="comment-text">
                <p>Tom Brady is going to take this one home!!!</p> 
              </div>
            </div>
          </div>
  
         
        </div>
        </div>
  
       
      </div>
    )
  }
}

export default GameThread