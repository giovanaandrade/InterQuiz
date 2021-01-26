import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
`;

export const QuizContainer = styled.div`
  width: 100%;
  padding-right: 10%;
  padding-left: 45%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const [name, setName] = useState('');
  const router = useRouter();

  return (
    <QuizBackground backgroundImage={db.bg}>

      <QuizContainer>
        <Title>Quiz do Inter</Title>
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={(e) => {
              e.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}
            >
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Escreva seu nome"
              />
              <button type="submit" disabled={name.length === 0}>
                Começar
              </button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <p>lorem ipsum dolor sit amet...</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/giovanaandrade" />
    </QuizBackground>
  );
}
