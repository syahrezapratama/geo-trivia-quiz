import React, { useState } from 'react';
import Quiz from './components/Quiz';
import StartScreen from './components/StartScreen';

function App() {
  
  // state to start the game
  const [startGame, setStartGame] = useState(false);

  function startQuiz() {
    setStartGame(true);
    console.log('test');
  }

  return (
    <div className="App">
      {!startGame
        ? <StartScreen startQuiz={startQuiz} />
        : <Quiz />
      }
    </div>
  );
}

export default App;
