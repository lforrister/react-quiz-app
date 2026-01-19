import '../resources/scss/Start.scss'

interface ChildProps {
    startQuiz: () => void;
}

export default function Start({startQuiz}: ChildProps) {
    
    return (
        <section className="start-main">
            <h1 className="start-title">Quizzical</h1>
            <h2 className="start-description">
                Time to test your knowledge
            </h2>

            <button onClick={startQuiz} className="button-primary">
                Start Quiz
            </button>
      </section>
    )
}
