import React, { useState } from 'react';

import Questions from 'components/blocks/Questions';
import Form from 'components/blocks/Form';

import StyledApp from './styles';
import QuizData from './types';

function App() {
  const [questionsData, setState] = useState<Array<QuizData>>([]);

  function addQuestion(text: string) {
    const newQuestionsData = [...questionsData];

    newQuestionsData.push({ question: text });
    setState(newQuestionsData);
  }

  return (
    <StyledApp>
      <Questions questionsData={questionsData} />
      <Form addQuestion={addQuestion} />
    </StyledApp>
  );
}

export default App;
