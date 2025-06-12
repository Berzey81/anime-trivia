import { useState } from "react";
import DifficultySelector from "./components/DifficultySelector/DifficultySelector";
import Game from "./components/Game/Game";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import QuestionCard from "./components/QuestionCard/QuestionCard";
import "./App.css";

function App() {
  const [difficulty, setDifficulty] = useState(null);
  const [score, setScore] = useState(0);

  return (
    <div className="app">
      <MusicPlayer />
      {!difficulty ? (
        <DifficultySelector setDifficulty={setDifficulty} />
      ) : (
        <Game
          difficulty={difficulty}
          score={score}
          setScore={setScore}
          setDifficulty={setDifficulty}
        />
      )}
    </div>
  );
}

export default App;
