import { QuizData } from 'components/App/types';

interface SelectedQuizProps {
  newQuizData: Array<QuizData>
  deleteRecord: (key: string) => void
}

export default SelectedQuizProps;
