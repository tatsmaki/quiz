import React from 'react';
import { List, Button } from 'antd';

import db from 'services/firebase';

import StyledQuestions from './styles';
import QuestionsProps from './types';

function Questions({ questionsData }: QuestionsProps) {
  function sendQuiz() {
    db.collection('quiz').add({ ...questionsData })
      .then((docRef) => {
      })
      .catch((error) => {
      });
  }

  return (
    <StyledQuestions>
      <List
        size="small"
        bordered
        dataSource={questionsData}
        renderItem={(item) => <List.Item>{item.question}</List.Item>}
      />
      <Button onClick={sendQuiz}>Generate</Button>
    </StyledQuestions>
  );
}

export default Questions;
