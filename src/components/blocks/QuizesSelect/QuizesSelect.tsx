import React from 'react';
import { Button } from 'antd';

import { Quiz } from 'components/App/types';

import QuizesSelectProps from './types';
import { StyledQuizesSelect, StyledQuizStatus } from './styles';

function QuizesSelect({ appData, handleClick }: QuizesSelectProps) {
  return (
    <StyledQuizesSelect>
      <span>Current Quizes:</span>
      {
        Object.values(appData).map((quiz: Quiz) => (
          <Button id={quiz.key} key={quiz.key} onClick={handleClick}>
            {quiz.key}
            <StyledQuizStatus status={quiz.status}>
              <span>{quiz.status}</span>
            </StyledQuizStatus>
          </Button>
        ))
      }
    </StyledQuizesSelect>
  );
}

export default QuizesSelect;
