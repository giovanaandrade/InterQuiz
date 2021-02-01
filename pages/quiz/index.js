import React from 'react';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';
import db from '../../db.json';

export default function QuizPage() {
  const router = useRouter();
  const { name } = router.query;

  return (
    <ThemeProvider theme={db.theme}>
      <QuizScreen
        questions={db.questions}
        backgroundImage={db.bg}
        name={name}
      />
    </ThemeProvider>
  );
}
