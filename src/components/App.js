import React from 'react';
import '../styles/main.css';
import NavBar from './NavBar';
import GameThread from './GameThread';

function App() {
  return (
    <div className="App">
      <NavBar />
      <GameThread />
    </div>
  );
}

export default App;
