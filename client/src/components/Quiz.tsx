import { useState } from 'react';
import type { Question } from '../models/Question.js';
import { getQuestions as fetchQuestions } from '../services/questionApi.js'; // ✅ avoid naming conflict

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const getQuestions = async () => {
    console.log('📡 Fetching questions from API...');
    try {
      const fetchedQuestions = await fetchQuestions(); // ✅ now using the API function

      if (!Array.isArray(fetchedQuestions) || fetchedQuestions.length === 0) {
        throw new Error('No questions received from API.');
      }

      console.log('✅ Questions received:', fetchedQuestions);
      setQuestions(fetchedQuestions);
    } catch (err) {
      console.error('❌ Error loading questions:', err);
      alert('Failed to load questions. Please try again later.');
    }
  };

  const handleAnswerClick = (isCorrect: boolean) => {
    if (isCorrect) setScore(score + 1);

    const next = currentQuestionIndex + 1;
    if (next < questions.length) {
      setCurrentQuestionIndex(next);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleStartQuiz = async () => {
    await getQuestions();
    setQuizStarted(true);
    setQuizCompleted(false);
    setScore(0);
    setCurrentQuestionIndex(0);
  };

  if (!quizStarted) {
    return (
      <div className="p-4 text-center">
        <button className="btn btn-primary d-inline-block mx-auto" onClick={handleStartQuiz}>
          Start Quiz
        </button>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="card p-4 text-center">
        <h2>Quiz Completed</h2>
        <div className="alert alert-success">
          Your score: {score}/{questions.length}
        </div>
        <button className="btn btn-primary d-inline-block mx-auto" onClick={handleStartQuiz}>
          Take New Quiz
        </button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className='card p-4'>
      <h2 data-testid="question">{currentQuestion.question}</h2>
      <div className="mt-3">
        {currentQuestion.answers.map((answer, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <button
              data-testid="answer"
              className="btn btn-primary"
              onClick={() => handleAnswerClick(answer.isCorrect)}
            >
              {index + 1}
            </button>
            <div className="alert alert-secondary mb-0 ms-2 flex-grow-1">{answer.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
