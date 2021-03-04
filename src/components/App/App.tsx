import React, { useState, useEffect } from 'react';

import quizRef from 'services/firebase';
import EditorPage from 'components/pages/EditorPage';

import StyledApp from './styles';
import { QuizData, AppData, initialApp } from './types';

function App() {
  const [appData, setAppData] = useState<AppData>(initialApp);
  console.log('new state', appData);

  useEffect(() => {
    quizRef.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const documentArray = Object.values(doc.data());
        const documentName = doc.id;
        const quiz = {
          name: documentName,
          key: doc.id,
          data: documentArray,
          status: '',
        };

        setAppData((prevState: AppData) => ({ ...prevState, [documentName]: quiz }));
      });
    });
  }, []);

  function updateAppData(currentQuiz: string, newQuizData: Array<QuizData>, quizStatus: string) {
    let data = newQuizData;
    let status = quizStatus;

    if (currentQuiz === 'New Quiz' && quizStatus === 'saved') {
      data = [];
      status = '';
    }

    setAppData((prevState: AppData) => (
      {
        ...prevState,
        [currentQuiz]: {
          name: prevState[currentQuiz].name,
          key: prevState[currentQuiz].key,
          data,
          status,
        },
      }
    ));
  }

  return (
    <StyledApp>
      <EditorPage
        appData={appData}
        updateAppData={updateAppData}
      />
    </StyledApp>
  );
}

export default App;
