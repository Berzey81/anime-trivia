import React, { useState, useEffect } from "react";
import QuestionCard from "../QuestionCard/QuestionCard";
import "./Game.css";
import easyQuestions from "../../data/easy.json";
import mediumQuestions from "../../data/medium.json";
import hardQuestions from "../../data/hard.json";

const Game = ({ difficulty, score, setScore, setDifficulty }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameOver, setGameOver] = useState(false);
  const [questions, setQuestions] = useState([]);

  // Load questions based on difficulty
  useEffect(() => {
    switch (difficulty) {
      case "easy":
        setQuestions(easyQuestions);
        break;
      case "medium":
        setQuestions(mediumQuestions);
        break;
      case "hard":
        setQuestions(hardQuestions);
        break;
      default:
        setQuestions([]);
    }
    // Reset game state when difficulty changes
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(15);
    setGameOver(false);
  }, [difficulty, setScore]);

  // Timer logic
  useEffect(() => {
    if (gameOver || questions.length === 0) return;

    const timer =
      timeLeft > 0 &&
      setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

    if (timeLeft === 0) {
      handleAnswer(false); // Auto-skip when time runs out
    }

    return () => clearInterval(timer);
  }, [timeLeft, gameOver, questions]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(15);
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setDifficulty(null);
  };

  if (gameOver || questions.length === 0) {
    return (
      <div className="game-end-screen">
        <h2>Game Completed!</h2>
        <p className="score-display">
          Your score: <span>{score}</span> / {questions.length}
        </p>
        <div className="difficulty-display">
          Difficulty: <span className={`diff-${difficulty}`}>{difficulty}</span>
        </div>
        <button className="play-again-btn" onClick={restartGame}>
          Choose New Difficulty
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="progress">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        <div className="score">
          Score: <span>{score}</span>
        </div>
        <div className={`timer ${timeLeft <= 5 ? "warning" : ""}`}>
          ⏱️ {timeLeft}s
        </div>
      </div>

      {currentQuestion && (
        <QuestionCard question={currentQuestion} handleAnswer={handleAnswer} />
      )}
    </div>
  );
};

export default Game;
