/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { motion } from 'framer-motion';
import {
  TwitterShareButton, TwitterIcon,
  FacebookShareButton, FacebookIcon,
  WhatsappIcon, WhatsappShareButton,
  TelegramIcon, TelegramShareButton,
} from 'react-share';
import { useRouter } from 'next/router';
import Widget from '../../src/components/Widget';
import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import Button from '../../src/components/Button';
import AlternativesForm from '../../src/components/AlternativesForm';
import BackLinkArrow from '../../src/components/BackLinkArrow';
import Loading from '../../src/components/Animations/Loading';
import Goal from '../../src/components/Animations/Goal';
import db from '../../db.json';
import Success from '../../src/components/Animations/Success';
import Wrong from '../../src/components/Animations/Wrong';

function LoadingWidget() {
  return (

    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>
      <Widget.Content>
        <Widget.Animation>
          <Loading />
        </Widget.Animation>
      </Widget.Content>
    </Widget>
  );
}

function ResultWidget({ results, totalQuestions }) {
  const acertos = results.filter((x) => x).length;
  const shareUrl = 'https://interquiz.giovanaandrade.vercel.app/';
  const quote = `Acertei ${acertos} perguntas de ${totalQuestions} no InterQuiz. Tente você também!`;
  const router = useRouter();
  const { name } = router.query;

  return (
    <Widget>
      <Widget.Header>
        <h1>Resultado</h1>
      </Widget.Header>

      <Widget.Content>
        <Widget.Animation>
          <Goal />
        </Widget.Animation>
        <p>
          {`${name}, você acertou ${acertos} pergunta(s)!`}
        </p>
        <p>Compartilhe o quiz com a galera!</p>
        <Widget.Share>
          <motion.div
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.9 }}
          >
            <TwitterShareButton url={shareUrl} title={quote}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FacebookShareButton url={shareUrl} quote={quote}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.9 }}
          >
            <WhatsappShareButton url={shareUrl} quote={quote}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.9 }}
          >
            <TelegramShareButton url={shareUrl} quote={quote}>
              <TelegramIcon size={32} round />
            </TelegramShareButton>
          </motion.div>
        </Widget.Share>
        <ul>
          {results.map((result, index) => (
            <>
              <li key={`result__${result}`}>
                <p>
                  {index + 1}
                  ª
                  {' '}
                  questão:
                  {' '}
                  {result === true
                    ? <CheckIcon />
                    : <ClearIcon />}
                </p>

              </li>
              <hr />

            </>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

ResultWidget.propTypes = {
  results: PropTypes.object.isRequired,
  totalQuestions: PropTypes.number.isRequired,
};

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativesForm
          onSubmit={(e) => {
            e.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 3 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Widget.Topic
                  as="label"
                  key={alternativeId}
                  htmlFor={alternativeId}
                  data-selected={isSelected}
                  data-status={isQuestionSubmited && alternativeStatus}
                >
                  <input
                    style={{ display: 'none' }}
                    id={alternativeId}
                    name={questionId}
                    onClick={() => setSelectedAlternative(alternativeIndex)}
                    type="radio"
                  />
                  {alternative}

                </Widget.Topic>
              </motion.div>
            );
          })}

          {/* <pre>
            {JSON.stringify(question, null, 4)}
          </pre> */}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && (
            <>
              <motion.div
                animate={{ scale: 1.5 }}
                transition={{ duration: 0.5 }}
              >
                <Widget.Animation>
                  <p>
                    <br />
                    Você acertou!
                    <Success />
                  </p>
                </Widget.Animation>
              </motion.div>
            </>
          )}
          {isQuestionSubmited && !isCorrect && (
          <motion.div
            animate={{ scale: 1.5 }}
            transition={{ duration: 0.5 }}
          >
            <Widget.Animation>
              <p>
                <br />
                Você errou!
                <Wrong />
              </p>
            </Widget.Animation>
          </motion.div>
          )}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

QuestionWidget.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  addResult: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
  questionIndex: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
};

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};
export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];
  const totalQuestions = db.questions.length;

  function addResult(result) {
    // results.push(result);
    setResults([
      ...results,
      result,
    ]);
  }

  // [React chama de: Efeitos || Effects]
  // React.useEffect
  // atualizado === willUpdate
  // morre === willUnmount
  useEffect(() => {
    // fetch() ...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 3 * 1000);
  // nasce === didMount
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
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
        && <ResultWidget results={results} totalQuestions={totalQuestions} />}
      </QuizContainer>
    </QuizBackground>
  );
}
