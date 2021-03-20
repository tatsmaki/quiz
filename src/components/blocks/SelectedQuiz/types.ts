import { QuizData } from 'components/App/types';

interface SelectedQuizProps {
  newQuizData: Array<QuizData>
  deleteQuestion: (key: string) => void
  editQuestion: (key: string) => void
}

export default SelectedQuizProps;
