import { useState, useEffect } from 'react'
import '../resources/scss/Quiz.scss'

export default function Quiz() {
    type QuizItem = {
        question: string,
        correct_answer: string,
        incorrect_answers: string[]
    }


    const apiUrl = 'https://opentdb.com/api.php?amount=10'

    const [quizData, setQuizData] = useState<QuizItem[]>([])

    useEffect(() => {
        console.log("loaded!")
        fetchQuizData()
    }, [])

    function fetchQuizData() {
        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Request failed')
                }
                return response.json()
            })
            .then((data) => {
                console.log('quiz data', data)
                setQuizData(data.results)
            })
            .catch((error) => {
                console.error(error)
            })
    }



    return (
        <div className="quiz-container">
        { quizData?.length ? (
            <>
                { quizData.map((item, index) => {
                    return (
                        <div key={index} className="quiz-item">
                            <h3 className="quiz-question">{item.question}</h3>
                        </div>
                    )
                })}
            </>


        ) : (
            <h1>Loading</h1>
        )}
        </div>
    )
}