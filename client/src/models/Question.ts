import type { Answer } from './Answer';

export interface Question {
  _id: string;
  question: string;
  answers: Answer[];
}
const questions: {
  question: string;
  answers: {
      text: string;
      isCorrect: boolean;
  }[];
}[] = [];

// Example usage of questions to avoid unused variable error
console.log(questions);