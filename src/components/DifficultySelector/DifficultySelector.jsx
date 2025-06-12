import "./DifficultySelector.css";

export default function DifficultySelector({ setDifficulty }) {
  return (
    <div className="difficulty-selector">
      <h1>Choose Difficulty</h1>
      <button onClick={() => setDifficulty("easy")}>Easy</button>
      <button onClick={() => setDifficulty("medium")}>Medium</button>
      <button onClick={() => setDifficulty("hard")}>Hard</button>
    </div>
  );
}
