import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import QuestionWidget from '../../components/QuestionWidget';
import LoadingWidget from '../../components/LoadingWidget';
import ResultWidget from '../../components/ResultWidget';

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};
export default function QuizScreen({ questions, backgroundImage, name }) {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = questions[questionIndex];
  const totalQuestions = questions.length;

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 3 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  QuizScreen.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    questions: PropTypes.array.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };

  return (
    <QuizBackground backgroundImage={backgroundImage}>
      <QuizContainer>
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT
        && <ResultWidget results={results} totalQuestions={totalQuestions} name={name} />}
      </QuizContainer>
    </QuizBackground>
  );
}
