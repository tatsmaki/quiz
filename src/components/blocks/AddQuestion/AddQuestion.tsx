import React, { useState } from 'react';
import { Input, Button } from 'antd';

import StyledAddQuestion from './styles';
import AddQuestionProps from './types';

function AddQuestion({ addQuestion }: AddQuestionProps) {
  const [questionText, setQuestionText] = useState('');

  function writeQuestion(event: React.ChangeEvent<HTMLInputElement>) {
    setQuestionText(event.target.value);
  }

  function onClick() {
    if (questionText) {
      addQuestion(questionText);
      setQuestionText('');
    }
  }

  return (
    <StyledAddQuestion>
      <Input placeholder="Enter Question" value={questionText} onChange={writeQuestion} />
      <Button onClick={onClick}>Add Question</Button>
    </StyledAddQuestion>
  );
}

export default AddQuestion;
