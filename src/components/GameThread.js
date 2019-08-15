import React from 'react';
import '../styles/GameThread.css';
import BearsLogo from '../images/bears-logo.svg';
import PatriotsLogo from '../images/patriots-logo.svg';
import PizzaWheel from '../images/pizza-wheel.svg';
import PizzaSlice from '../images/pizza-slice.svg';
import UserAvatar from '../images/user-avatar.jpg';

const GameThread = () => {
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
        <span className="team-name">Chicago Bears</span>
        <span className="vs">VS</span>
        <span className="team-name">New England Patriots</span>
        <img src={PatriotsLogo} />
      </div>

      <div className="predictions">
        <h2>User Predictions</h2>
        <div className="prediction-counter">
          <div className="prediction home-team-prediction"><span>25%</span></div>
          <div className="prediction away-team-prediction"><span>75%</span></div>
        </div>
      </div>

      <div className="discussion-container">
        <h2>Place Your Slices On Your Favorite Team</h2>
        <hr></hr>
        <div className="betting-container">

        <form>
          <div className="winner-selection">
          <h3>1. Choose Winner</h3>
            {/* TODO: Add real team data */}
            <label>
              CHI
              <input type="radio" name="winning-team" value="home-team" />
            </label>
            <label>
              NE
              <input type="radio" name="winning-team" value="away-team" />
            </label>
          </div>

          <div className="slice-allocation">
            <h3>2. Place Your Slices</h3>
            <img src={PizzaWheel} />
            <input type="range" min="1" max="8" />
          </div>

          <div className="comment-input">
            <h3>3. Throw Some Cheese</h3>
            <textArea type="text" name="comment"  />
            <button className="button">Slice It</button>
          </div>

          </form>
        </div>
        <h2>Discussion</h2>
        <hr></hr>
        <div className="comment">
          <img className="user-avatar" src={UserAvatar} />
          <div className="comment-details">
            <span className="username">ninjajon</span>
            <img src={PizzaSlice} />
            <span>5</span>
            <img src={BearsLogo} />
            <span>5 minutes ago</span>
          </div>
          <div className="comment-body">
            <p>Tom Brady is going to take this one home!!!</p> 
          </div>
        </div>
        <div className="comment">
          <img className="user-avatar" src={UserAvatar} />
          <div className="comment-details">
            <span className="username">ninjajon</span>
            <img src={PizzaSlice} />
            <span>5</span>
            <img src={BearsLogo} />
            <span>5 minutes ago</span>
          </div>
          <div className="comment-body">
            <p>Tom Brady is going to take this one home!!!</p> 
          </div>
        </div>
        <div className="comment">
          <img className="user-avatar" src={UserAvatar} />
          <div className="comment-details">
            <span className="username">ninjajon</span>
            <img src={PizzaSlice} />
            <span>5</span>
            <img src={BearsLogo} />
            <span>5 minutes ago</span>
          </div>
          <div className="comment-body">
            <p>Tom Brady is going to take this one home!!!</p> 
          </div>
        </div>
      </div>
      </div>

     
    </div>
  )
}

export default GameThread