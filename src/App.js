import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Games from './pages/Games';
import Leaderboard from './pages/Leaderboard';
import SignUp from './pages/SignupPage';
import Header from './components/Header';
import './styles/main.css';

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path='/' exact component={Games} />
            <Route path='/leaderboard' component={Leaderboard} />
            <Route path='/login' component={SignUp} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
