export interface QuizData {
  key: number
  number: number
  question: string
  answer: string
  tags: Array<string>
}

export interface Quiz {
  name: string
  key: string
  data: Array<QuizData>
  status: string
}

export interface AppData {
  [key: string]: Quiz
}

export const initialApp = {
  'New Quiz': {
    name: '',
    key: 'New Quiz',
    data: [],
    status: '',
  },
};
