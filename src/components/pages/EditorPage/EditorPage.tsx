import React, { useState, useEffect } from 'react';
import { Button, Input } from 'antd';

import quizRef from 'services/firebase';

import { QuizData } from 'components/App/types';
import QuizesSelect from 'components/blocks/QuizesSelect';
import SelectedQuiz from 'components/blocks/SelectedQuiz';
import AddQuestion from 'components/blocks/AddQuestion';

import EditorPageProps from './types';
import {
  StyledEditorPage,
  StyledQuizEditor,
  StyledSaveQuiz,
} from './styles';

interface EditQuestion {
  isEdit: boolean
  text: string
}

function EditorPage({ appData, updateAppData }: EditorPageProps) {
  const [currentQuiz, setCurrentQuiz] = useState<string>('New Quiz');

  const [quizName, setQuizName] = useState<string>('');
  const [quizStatus, setQuizStatus] = useState<string>('');
  const [quizData, setQuizData] = useState<Array<QuizData>>(appData['New Quiz'].data);

  const [isEditQuestion, setEditQuestion] = useState<EditQuestion>({ isEdit: false, text: '' });

  useEffect(() => {
    if (quizStatus) {
      updateAppData(currentQuiz, quizData, quizStatus);
    }
  }, [quizStatus, quizData]);

  function writeQuizName(event: React.ChangeEvent<HTMLInputElement>) {
    setQuizName(event.target.value);
  }

  function sendQuiz() {
    if (quizName) {
      quizRef.doc(quizName).set({ ...quizData })
        .then(() => {
          setQuizStatus('saved');
        })
        .catch(() => {
          setQuizStatus('failed');
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

    setQuizStatus('edited');
    setQuizData(newQuizData);
  }

  function deleteQuestion(key: string) {
    const removeIndex = +key - 1;

    let newQuizData = [...appData[currentQuiz].data];

    newQuizData.splice(removeIndex, 1);
    newQuizData = newQuizData.map((item: any, index: number) => (
      { ...item, key: index + 1, number: index + 1 }
    ));

    setQuizStatus('edited');
    setQuizData(newQuizData);
  }

  function editQuestion(key: string) {
    const editIndex = +key - 1;

    setEditQuestion({
      isEdit: true,
      text: appData[currentQuiz].data[editIndex].question,
    });
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

      <QuizesSelect appData={appData} handleClick={handleClick} />

      <StyledQuizEditor>
        <StyledSaveQuiz>
          <Input placeholder="Enter Quiz Name" value={quizName} onChange={writeQuizName} />
          <Button onClick={sendQuiz}>Save Quiz</Button>
        </StyledSaveQuiz>
        <SelectedQuiz
          newQuizData={quizData}
          deleteQuestion={deleteQuestion}
          editQuestion={editQuestion}
        />
        <AddQuestion addQuestion={addQuestion} editQuestion={isEditQuestion} />
      </StyledQuizEditor>

    </StyledEditorPage>
  );
}

export default EditorPage;
