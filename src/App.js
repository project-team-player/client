// Libraries imports here
import React, { useState, useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// import react contexts
import { UserProvider, AuthContext, UserContext } from './contexts/UserContext';

// Page Imports Here
import Leaderboard from './pages/Leaderboard';
// import SignUp from './pages/SignupPage';

// Component Imports Here
import Header from './components/Header';
import GamesList from './pages/GamesList';

// CSS Imports Here
import './styles/main.css';
import AuthModal from './components/AuthModal';

const App = () => {
  return (
    <div className='container'>
      <BrowserRouter>
        <UserProvider>
          <UserContext.Consumer>
          {context => (
            <>
          <Header/> 
          <div className="page-content">
            {context.state.showAuthModal && <AuthModal loginView={context.state.showLogin} formMessage={context.state.loginModalMessage} />}
            <div className={`${context.state.showAuthModal ? 'faded' : ''}`} id="fadeable-section" onClick={context.state.showAuthModal ? context.hideModal : false}>
              <Switch>
                <Route path='/' exact component={GamesList} />
                <Route path='/leaderboard' component={Leaderboard} />
                <Route path='/login' render={(props) => <AuthModal modal={false} />} showLogin={true} />
                <Route path='/signup' render={(props) => <AuthModal modal={false} />} 
                showLogin={true} />
              </Switch>
            </div>
          </div>
          </>
          )}
          </UserContext.Consumer>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;


