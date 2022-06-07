import React, { useState } from "react";
import { fetchQuizQuestions } from "../../API";
import QuestionCard from "./question-card";
import { QuizStyle, Wrapper } from "./quiz.styles";
import { AnswerObject, Difficulty, QuestionState } from "../../types";

const TOTAL_QUESTIONS = 10;

const Quiz = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //Users answer
      const userAnswer = e.currentTarget.value;
      //Check answer against correct answer
      const correct = questions[number].correct_answer === userAnswer;
      //Add score if answer correct
      if (correct) {
        setScore((prevScore) => prevScore + 1);
      }
      //Save answer in array for user answers
      const answerObject = {
        question: questions[number].question,
        answer: userAnswer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prevUserAnswers) => [...prevUserAnswers, answerObject]);
    }
  };

  const nextQuestion = () => {
    //Move onto next question if not on the last q
    const nextQ = number + 1; //as TotalQ starts at 0 not 1
    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  return (
    <>
      <QuizStyle />
      <Wrapper className="App">
        <h1>REACT QUIZ</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        ) : null}
        {!gameOver ? <p className="score">Score: {score}</p> : null}
        {loading ? <p>Loading Quesions...</p> : null}
        {!loading && !gameOver ? (
          <QuestionCard
            questionNumber={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answer}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            cb={checkAnswer}
          />
        ) : null}
        {!gameOver &&
        !loading &&
        userAnswers.length > 0 &&
        userAnswers.length !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default Quiz;
