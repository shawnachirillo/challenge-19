import type { Question } from '../models/Question';

export const getQuestions = async (): Promise<Question[]> => {
  try {
    const response = await fetch('/api/questions');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: Question[] = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    throw error;
  }
};
