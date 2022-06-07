import React from "react";
import { AnswerObject } from "../../types";
import { Wrapper, ButtonWrapper } from "./question-card.styles";

type Props = {
  question: string;
  answers: string[];
  cb: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
};

//From React, .FC is telling TS that the type of this const is `Functional Component`
const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  cb,
  userAnswer,
  questionNumber,
  totalQuestions,
}) => (
  <Wrapper>
    <p className="number">
      Question: {questionNumber} / {totalQuestions}
    </p>
    {/* From our API, we will recieve HTML - so we can use a React `Dangerous HTML` to attempt to show it */}
    <p dangerouslySetInnerHTML={{ __html: question }}></p>
    <div>
      {answers.map((answer) => (
        <ButtonWrapper
          key={answer}
          correct={userAnswer?.correctAnswer === answer}
          userClicked={userAnswer?.answer === answer}
        >
          <button disabled={!!userAnswer} value={answer} onClick={cb}>
            <span dangerouslySetInnerHTML={{ __html: answer }}></span>
          </button>
        </ButtonWrapper>
      ))}
    </div>
  </Wrapper>
);

export default QuestionCard;
