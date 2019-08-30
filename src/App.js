// Libraries imports here
import React, { useState, useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// import react contexts
import { UserProvider, AuthContext } from './contexts/UserContext';

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
          <AuthContext>
            {(context) => (
              <>
              <Header isLoggedIn={context.state.isLoggedIn} /> 
              <div className="page-content">
                {context.state.isVisible && <AuthModal loginView={context.state.showLogin} />}
                <div className={`${context.state.isVisible ? 'faded' : ''}`} id="fadeable-section" onClick={context.state.isVisible ? context.hideModal : false}>
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
          </AuthContext>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;


