// Libraries imports here
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Page Imports Here
import Leaderboard from './pages/Leaderboard';
import SignUp from './pages/SignupPage';

// Component Imports Here
import Header from './components/Header';
import GamesList from './pages/GamesList';

// CSS Imports Here
import './styles/main.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      games: {}
    };
  }

  render() {
    return (
      <div className='container'>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path='/' exact component={GamesList} />
            <Route path='/leaderboard' component={Leaderboard} />
            <Route path='/login' component={SignUp} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
