import React, { useState, useEffect } from "react";
import "./QuestionCard.css";

const QuestionCard = ({ question, handleAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  // Shuffle answers on question change
  useEffect(() => {
    const answers = [...question.incorrectAnswers, question.correctAnswer];
    setShuffledAnswers(answers.sort(() => Math.random() - 0.5));
    setSelectedAnswer(null);
  }, [question]);

  const handleClick = (answer) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    setSelectedAnswer(answer);
    setTimeout(() => {
      handleAnswer(answer === question.correctAnswer);
    }, 1000); // Show feedback for 1 second
  };

  const getAnswerClass = (answer) => {
    if (selectedAnswer === null) return "";
    if (answer === question.correctAnswer) return "correct";
    if (answer === selectedAnswer && answer !== question.correctAnswer)
      return "incorrect";
    return "disabled";
  };

  return (
    <div className="question-card">
      <h2
        className="question-text"
        dangerouslySetInnerHTML={{ __html: question.question }}
      />

      <div className="answers-grid">
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            className={`answer-button ${getAnswerClass(answer)}`}
            onClick={() => handleClick(answer)}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
