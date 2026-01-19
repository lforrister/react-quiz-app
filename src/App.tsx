import { useState } from 'react'
import Start from './components/Start';
import Quiz from './components/Quiz'
import './App.scss';


function App() {
  const [pageStatus, setPageStatus] = useState<String>('Start')

  function handleStartClick() {
    setPageStatus('Quiz')
  }


  return (
    <div className="App">
      { pageStatus === 'Start' ? (
          <Start startQuiz={handleStartClick} />
        ) :  (
          <Quiz />
        ) 
      }
    </div>
  );
}

export default App;
