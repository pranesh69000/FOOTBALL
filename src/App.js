import React, { useState } from 'react';
import PlayerForm from './components/PlayerForm';
import PlayerList from './components/PlayerList';
import './App.css';
function App() {
  const [players, setPlayers] = useState([]);
  const handlePlayerAdded = (newPlayer) => {
    setPlayers([newPlayer, ...players]);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Football Players Database</h1>
      </header>
      <main>
        <PlayerForm onPlayerAdded={handlePlayerAdded} />
        <PlayerList />
      </main>
    </div>
  );
}
export default App;