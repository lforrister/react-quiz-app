import { useState, useEffect } from 'react'
import '../resources/scss/Quiz.scss'
import { shuffle, decodeHtml } from '../utils'

export default function Quiz() {
    
    type QuizItem = {
        question: string,
        correct_answer: string,
        incorrect_answers: string[]
    }


    const apiUrl = 'https://opentdb.com/api.php?amount=10'

    const [quizData, setQuizData] = useState<QuizItem[]>([])

    useEffect(() => {
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

    function getQuizAnswers(item: QuizItem) {
        const allAnswers = [...item.incorrect_answers, item.correct_answer]
        const shuffled = shuffle(allAnswers)

        return shuffled
    }



    return (
        <div className="quiz-container">
        { quizData?.length ? (
            <>
                { quizData.map((item, index) => {
                    return (
                        <div key={index} className="quiz-item">
                            <h3 className="quiz-question">{ decodeHtml(item.question)}</h3>

                            <div className="quiz-answers">
                                { getQuizAnswers(item).map((answer, i) => {
                                    return (
                                        <button key={i} className="button button-secondary">
                                            { decodeHtml(answer) }
                                        </button>
                                    )
                                })}
                            </div>
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