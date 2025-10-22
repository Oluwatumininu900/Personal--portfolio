import React, { useState, useEffect, useCallback } from "react";
import "./Quize.css";

// --- Quiz Data ---
const quizData = { /* ... keep all your questions as-is ... */ };

// --- Utility Functions (unchanged) ---
const MAX_SCORE = 20;

const getBestScore = () => {
  const storedScore = localStorage.getItem("quizBestScore20");
  return storedScore ? parseInt(storedScore, 10) : 0;
};

const setBestScore = (score) => {
  const currentBest = getBestScore();
  if (score > currentBest) {
    localStorage.setItem("quizBestScore20", score);
    return true;
  }
  return false;
};

const initializeFullQuizQuestions = () => {
  const allQuestions = Object.values(quizData).flat();
  for (let i = allQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
  }
  return allQuestions;
};

// --- Components ---

const QuizButton = ({ children, onClick, ...props }) => (
  <button onClick={onClick} className="quiz-btn" {...props}>
    {children}
  </button>
);

const HomeScreen = ({ startFullQuiz, goToCategories, bestScore }) => (
  <div className="home-screen">
    <h1 className="quiz-title">Frontend Quiz Pro</h1>
    <p className="quiz-desc">
      Test your knowledge across HTML, CSS, JavaScript, and React. A total of 20
      questions await!
    </p>

    <div className="quiz-buttons">
      <button className="quiz-btn green" onClick={startFullQuiz}>
        Start Full Quiz (20 Qs)
      </button>

      <div className="divider">
        <span className="or-text">OR</span>
      </div>

      <button className="quiz-btn blue" onClick={goToCategories}>
        Select Category (5 Qs)
      </button>

      <p className="best-score">🥇 Best Full Quiz Score: {bestScore}/{MAX_SCORE}</p>
    </div>
  </div>
);

const CategoryScreen = ({ startCategoryQuiz }) => (
  <div className="category-screen">
    <h2 className="category-title">Select a Category (5 Questions)</h2>
    <div className="category-grid">
      {Object.keys(quizData).map((category) => (
        <button
          key={category}
          onClick={() => startCategoryQuiz(category)}
          className={`category-btn ${category.toLowerCase()}-btn`}
        >
          {category}
        </button>
      ))}
    </div>
  </div>
);

const QuizScreen = ({
  currentQuestion,
  currentQuestionSet,
  currentQuestionIndex,
  handleAnswer,
  quizMode,
  selectedCategory,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const totalQuestionsInSet = currentQuestionSet.length;

  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
  }, [currentQuestion]);

  const onOptionClick = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    const correct = option === currentQuestion.answer;
    setIsCorrect(correct);
    setIsAnswered(true);
    setTimeout(() => handleAnswer(correct), 800);
  };

  return (
    <div className="quiz-screen">
      <div className="progress-bar-section">
        <div className="progress-header">
          <h3 className="category-name">
            {quizMode === "full" ? currentQuestion.category : selectedCategory}
          </h3>
          <span className="question-count">
            Question {currentQuestionIndex + 1} of {totalQuestionsInSet}
          </span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${
                ((currentQuestionIndex + 1) / totalQuestionsInSet) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>

      <div className="question-box">
        <p>{currentQuestion.question}</p>
      </div>

      <div className="options-grid">
        {currentQuestion.options.map((option, index) => (
          <div
            key={index}
            className={`option ${
              isAnswered
                ? option === currentQuestion.answer
                  ? "correct"
                  : option === selectedOption
                  ? "wrong"
                  : "disabled"
                : ""
            }`}
            onClick={() => onOptionClick(option)}
          >
            <span className="option-letter">
              {String.fromCharCode(65 + index)}.
            </span>
            {option}
          </div>
        ))}
      </div>

      {isAnswered && (
        <div className={`feedback ${isCorrect ? "correct" : "wrong"}`}>
          {isCorrect ? "✅ Correct!" : "❌ Incorrect!"}
        </div>
      )}
    </div>
  );
};

const ScoreScreen = ({
  currentRunScore,
  totalQuestions,
  restartQuiz,
  isNewBestScore,
  quizMode,
}) => {
  const isFullQuiz = quizMode === "full";
  const scoreForFeedback = isFullQuiz
    ? currentRunScore
    : currentRunScore * 4;

  const grade = getFeedback(scoreForFeedback);

  return (
    <div className={`score-screen ${grade.key}`}>
      <div className="emoji">{grade.icon}</div>
      <h2 className="score-title">{grade.title}</h2>

      {isNewBestScore && isFullQuiz && (
        <div className="new-best">✨ New Best Score (20 Qs)!</div>
      )}

      <p className="score-text">
        You scored <span>{currentRunScore}</span> out of {totalQuestions}
      </p>

      <p className="feedback-text">{grade.message}</p>

      <button className="quiz-btn" onClick={restartQuiz}>
        Start New Quiz
      </button>
    </div>
  );
};

// --- Helper for feedback ---
const getFeedback = (score) => {
  if (score >= 15)
    return { key: "high", icon: "🎉", title: "Great job!", message: "Excellent performance!" };
  if (score >= 10)
    return { key: "medium", icon: "🙂", title: "Not bad!", message: "Keep practicing!" };
  return { key: "low", icon: "😅", title: "Keep learning!", message: "Study more and try again!" };
};

// --- Main App ---
const Quize = () => {
  const [gameState, setGameState] = useState("home");
  const [quizMode, setQuizMode] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentRunScore, setCurrentRunScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestionSet, setCurrentQuestionSet] = useState([]);
  const [bestScore, setBestScoreState] = useState(getBestScore);
  const [isNewBestScore, setIsNewBestScore] = useState(false);

  useEffect(() => {
    setBestScoreState(getBestScore());
  }, []);

  const goToCategories = () => setGameState("categories");

  const startFullQuiz = () => {
    const questions = initializeFullQuizQuestions();
    setCurrentQuestionSet(questions);
    setQuizMode("full");
    setCurrentRunScore(0);
    setCurrentQuestionIndex(0);
    setGameState("quiz");
  };

  const startCategoryQuiz = (category) => {
    setSelectedCategory(category);
    setCurrentQuestionSet(quizData[category]);
    setQuizMode("category");
    setCurrentRunScore(0);
    setCurrentQuestionIndex(0);
    setGameState("quiz");
  };

  const restartQuiz = () => {
    setGameState("home");
    setCurrentRunScore(0);
    setCurrentQuestionIndex(0);
    setSelectedCategory(null);
    setQuizMode(null);
    setIsNewBestScore(false);
  };

  const handleAnswer = useCallback(
    (isCorrect) => {
      const scoreIncrease = isCorrect ? 1 : 0;
      const nextIndex = currentQuestionIndex + 1;
      const isFinished = nextIndex >= currentQuestionSet.length;
      if (scoreIncrease > 0)
        setCurrentRunScore((prev) => prev + scoreIncrease);
      if (isFinished) {
        const finalScore = currentRunScore + scoreIncrease;
        let newBest = false;
        if (quizMode === "full") {
          newBest = setBestScore(finalScore);
          setBestScoreState(getBestScore());
        }
        setIsNewBestScore(newBest);
        setTimeout(() => setGameState("score"), 1000);
      } else {
        setTimeout(() => setCurrentQuestionIndex(nextIndex), 800);
      }
    },
    [currentQuestionIndex, currentQuestionSet.length, currentRunScore, quizMode]
  );

  const renderScreen = () => {
    switch (gameState) {
      case "home":
        return (
          <HomeScreen
            startFullQuiz={startFullQuiz}
            goToCategories={goToCategories}
            bestScore={bestScore}
          />
        );
      case "categories":
        return <CategoryScreen startCategoryQuiz={startCategoryQuiz} />;
      case "quiz":
        return (
          <QuizScreen
            currentQuestion={currentQuestionSet[currentQuestionIndex]}
            currentQuestionSet={currentQuestionSet}
            currentQuestionIndex={currentQuestionIndex}
            handleAnswer={handleAnswer}
            selectedCategory={selectedCategory}
            quizMode={quizMode}
          />
        );
      case "score":
        return (
          <ScoreScreen
            currentRunScore={currentRunScore}
            totalQuestions={currentQuestionSet.length}
            restartQuiz={restartQuiz}
            isNewBestScore={isNewBestScore}
            quizMode={quizMode}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="quize-container">
      {renderScreen()}
    </div>
  );
};

export default Quize;
