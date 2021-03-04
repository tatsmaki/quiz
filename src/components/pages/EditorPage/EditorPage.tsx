import React, { useState, useEffect } from 'react';
import { Button, Input } from 'antd';

import quizRef from 'services/firebase';

import { QuizData, Quiz } from 'components/App/types';
import SelectedQuiz from 'components/blocks/SelectedQuiz';
import AddQuestion from 'components/blocks/AddQuestion';

import EditorPageProps from './types';
import {
  StyledEditorPage,
  StyledQuizesSelect,
  StyledQuizEditor,
  StyledSaveQuiz,
} from './styles';

function EditorPage({ appData, updateAppData }: EditorPageProps) {
  const [currentQuiz, setCurrentQuiz] = useState<string>('New Quiz');
  const [quizData, setQuizData] = useState<Array<QuizData>>(appData['New Quiz'].data);
  const [quizName, setQuizName] = useState<string>('');
  const [quizStatus, setQuizStatus] = useState<string>('');

  useEffect(() => {
    if (quizStatus) {
      console.log(currentQuiz, quizStatus);
      updateAppData(currentQuiz, quizData, quizStatus);
    }
  }, [quizStatus]);

  function writeQuizName(event: React.ChangeEvent<HTMLInputElement>) {
    setQuizName(event.target.value);
  }

  function sendQuiz() {
    if (quizName) {
      quizRef.doc(quizName).set({ ...quizData })
        .then(() => {
          setQuizStatus('green');
        })
        .catch(() => {
          setQuizStatus('red');
        });
    }
  }

  function addQuestion(text: string) {
    const newQuizData = [...appData[currentQuiz].data];
    const length = newQuizData.length + 1;

    newQuizData.push({
      key: length,
      number: length,
      question: text,
      answer: '',
      tags: [],
    });

    setQuizStatus('yellow');
    setQuizData(newQuizData);
  }

  function deleteQuestion(key: string) {
    const removeIndex = +key - 1;

    let newQuizData = [...appData[currentQuiz].data];

    newQuizData.splice(removeIndex, 1);
    newQuizData = newQuizData.map((item: any, index: number) => (
      { ...item, key: index + 1, number: index + 1 }
    ));

    setQuizStatus('yellow');
    setQuizData(newQuizData);
  }

  function handleClick(event: any) {
    const { id } = event.target.closest('button');
    setCurrentQuiz(id);
    setQuizName(appData[id].name);
    setQuizData(appData[id].data);
    setQuizStatus('');
  }

  return (
    <StyledEditorPage>

      <StyledQuizesSelect>
        <span>Current Quizes:</span>
        {
          Object.values(appData).map((quiz: Quiz) => (
            <Button style={{ display: 'flex', alignItems: 'center' }} id={quiz.key} key={quiz.key} onClick={handleClick}>
              {quiz.key}
              <div style={{ background: quiz.status, width: '1vw', height: '1vw' }} />
            </Button>
          ))
        }
      </StyledQuizesSelect>

      <StyledQuizEditor>
        <StyledSaveQuiz>
          <Input placeholder="Enter Quiz Name" value={quizName} onChange={writeQuizName} />
          <Button onClick={sendQuiz}>Save Quiz</Button>
        </StyledSaveQuiz>
        <SelectedQuiz newQuizData={quizData} deleteRecord={deleteQuestion} />
        <AddQuestion addQuestion={addQuestion} />
      </StyledQuizEditor>

    </StyledEditorPage>
  );
}

export default EditorPage;
