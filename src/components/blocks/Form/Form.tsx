import React, { useState } from 'react';
import { Input, Button } from 'antd';

import StyledForm from './styles';
import FormProps from './types';

function Form({ addQuestion }: FormProps) {
  const [text, setState] = useState('');

  function setText(event: React.ChangeEvent<HTMLInputElement>) {
    setState(event.target.value);
  }

  function onClick() {
    addQuestion(text);
    setState('');
  }

  return (
    <StyledForm>
      <Input placeholder="Enter Question" value={text} onChange={setText} />
      <Button onClick={onClick}>Add Question</Button>
    </StyledForm>
  );
}

export default Form;
