import React from 'react';
import PropTypes from 'prop-types';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { Fragment } from 'react-is';
import Widget from '../Widget';
import Goal from '../Animations/Goal';
import ShareWidget from '../ShareWidget';

export default function ResultWidget({ results, totalQuestions, name }) {
  const acertos = results.filter((x) => x).length;
  const shareUrl = 'https://interquiz.giovanaandrade.vercel.app/';
  const quote = `Acertei ${acertos} perguntas de ${totalQuestions} no InterQuiz. Tente você também!`;

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
          <ShareWidget shareUrl={shareUrl} quote={quote} />
        </Widget.Share>
        <ul>
          {results.map((result, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={`result__${index}`}>
              <li>
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
            </Fragment>

          ))}

        </ul>
      </Widget.Content>
    </Widget>
  );
}

ResultWidget.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  results: PropTypes.array.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
