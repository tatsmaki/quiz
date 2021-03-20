import { AppData, QuizData } from 'components/App/types';

interface EditPageProps {
  appData: AppData
  updateAppData: (currentQuiz: string, newQuizData: Array<QuizData>, quizStatus: string) => void
}

export default EditPageProps;
