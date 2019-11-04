// Libraries imports here
import React, { useState, useContext, useEffect, useRef } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ReactGA from "react-ga";
import { createBrowserHistory } from "history";

// import react contexts
import { UserProvider, AuthContext, UserContext } from "./contexts/UserContext";

// Page Imports Here
import Leaderboard from "./pages/Leaderboard";
import Splash from "./pages/Splash";
// import SignUp from './pages/SignupPage';

// Component Imports Here
import Header from "./components/Header";
import GamesList from "./pages/GamesList";
import Footer from './components/Footer';

// CSS Imports Here
import "./styles/main.css";
import AuthModal from "./components/AuthModal";

// Google Analytics Setup
ReactGA.initialize("UA-151338746-1");
ReactGA.pageview(window.location.pathname + window.location.search);
// ReactGA.modalview("./components/AuthModal");

// Initialize google analytics page view tracking
const history = createBrowserHistory();

history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

// Could not figure out where this callback gets sent in GA, but was in a tutorial
// // Load Performance tracking
// const callback = list => {
//   list.getEntries().forEach(entry => {
//     ReactGA.timing({
//       category: "Load Performace",
//       variable: "Server latency",
//       value: entry.responseStart - entry.requestStart
//     });
//   });
// };
// var observer = new PerformanceObserver(callback);
// observer.observe({ entryTypes: ["navigation"] });

const App = () => {
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);


  useEffect(() => {
    setHeaderHeight(headerRef.current.offsetHeight);
  });

  return (
    <div className="container">
      <BrowserRouter>
        <UserProvider>
          <UserContext.Consumer>
            {context => (
              <>
                <Header refName={headerRef} />
                <div className="page-content" style={{ minHeight: `calc(100vh - ${headerHeight}px)`}}>
                  {context.state.showAuthModal && (
                    <AuthModal
                      loginView={context.state.showLogin}
                      formMessage={context.state.loginModalMessage}
                    />
                  )}
                  <div
                    className={`${context.state.showAuthModal ? "faded" : ""}`}
                    id="fadeable-section"
                    type="User"
                    onClick={
                      context.state.showAuthModal ? context.hideModal : false
                    }
                  >
                    <Switch>
                      <Route
                        path="/"
                        exact
                        component={Splash}
                        history={history}
                      />
                      <Route
                        path="/games"
                        exact
                        component={GamesList}
                        history={history}
                      />
                      <Route
                        path="/leaderboard"
                        component={Leaderboard}
                        history={history}
                      />
                      <Route
                        path="/login"
                        render={props => <AuthModal modal={false} />}
                        showLogin={true}
                      />
                      <Route
                        path="/signup"
                        render={props => <AuthModal modal={false} />}
                        showLogin={true}
                      />
                    </Switch>
                  </div>
                </div>
                <Footer />
              </>
            )}
          </UserContext.Consumer>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
