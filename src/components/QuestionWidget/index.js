import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Widget from '../Widget';
import BackLinkArrow from '../BackLinkArrow';
import AlternativesForm from '../AlternativesForm';
import Button from '../Button';
import Success from '../Animations/Success';
import Wrong from '../Animations/Wrong';

export default function QuestionWidget({
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
                key={alternativeId}
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
                <div>
                  <p>
                    <br />
                    Você acertou!
                    <br />
                  </p>
                  <Success />
                </div>
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
                <div>
                  <p>
                    <br />
                    Você errou!
                    <br />
                  </p>
                  <Wrong />
                </div>
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
  // eslint-disable-next-line react/forbid-prop-types
  question: PropTypes.object.isRequired,
  questionIndex: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
};
