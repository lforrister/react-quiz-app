import { useState } from 'react'
import Start from './components/Start';
import Quiz from './components/Quiz'
import './App.scss';

function App() {
    type QuizItem = {
        question: string,
        correct_answer: string,
        incorrect_answers: string[],
        selected?: string,
        shuffledAnswers?: string[]
        
    }

  const [pageStatus, setPageStatus] = useState('Start')

  function handleStartClick() {
    setPageStatus('Quiz')
  }

  function handleQuizSubmit(quizData: QuizItem[]) {
    console.log('checking!', quizData)
  }

  return (
    <div className="App">
      { pageStatus === 'Start' ? (
          <Start startQuiz={handleStartClick} />
        ) : (
          <Quiz onSubmit={handleQuizSubmit}/>
        )
      }
    </div>
  );
}

export default App;
