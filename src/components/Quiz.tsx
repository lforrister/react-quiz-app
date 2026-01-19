import { useState, useEffect } from 'react'
import '../resources/scss/Quiz.scss'
import { shuffle, decodeHtml } from '../utils'

    
type QuizItem = {
    question: string,
    correct_answer: string,
    incorrect_answers: string[],
    selected?: string,
    shuffledAnswers?: string[]
    
}


export default function Quiz() {

    const apiUrl = 'https://opentdb.com/api.php?amount=10'

    const [quizData, setQuizData] = useState<QuizItem[]>([])
    const [submitted, setSubmitted] = useState<boolean>(false)

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
                const modifiedData = data.results.map((item: QuizItem) => {
                    return {...item, shuffledAnswers: shuffle([...item.incorrect_answers, item.correct_answer])}
                })
                console.log('modified data', modifiedData)
                setQuizData(modifiedData)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function selectAnswer(answer: string, question: string) {
        setQuizData((prevData: QuizItem[]) => {
            return (
                prevData.map((data) => {
                    if (data.question === question) {
                        return { ...data, selected: answer}
                    } else {
                        return data
                    }
                })
            )
        })
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setSubmitted(true)
    }

    const answerChoices = (item: QuizItem) => {

            return (
                item.shuffledAnswers?.map((answer, i) => {
                    return (
                        <button 
                            type="button"
                            key={i} 
                            className={getButtonClasses(item, answer)}
                            onClick={() => selectAnswer(answer, item.question)}
                        >
                            { decodeHtml(answer) }
                        </button>
                    )
                })
            )
        
    }

    function getButtonClasses(item: QuizItem, answer: String) {

        if (submitted) {
            const isCorrect = (() => {
                if (item.selected === item.correct_answer) {
                    if (item.selected === answer) {
                        return true
                    }
                }

                return false
            })

            const isWrong = (() => {
                if (item.selected !== item.correct_answer) {
                    if (item.selected === answer) {
                        return true
                    }
                }

                return false
            })
            return `button button-primary quiz-submit-button ${isCorrect() ? 'is-correct' : isWrong() ? 'is-wrong' : 'is-disabled'}`
        }
        return `button button-primary quiz-submit-button ${item.selected === answer ? 'is-selected' : ''}`
    }



    return (
        <div className="quiz-container">
        { quizData?.length ? (
            <form onSubmit={handleSubmit}>
                { quizData.map((item, index) => {
                    return (
                        <div key={index} className="quiz-item">
                            <h3 className="quiz-question">{ decodeHtml(item.question)}</h3>

                            <div className="quiz-answers">
                                { answerChoices(item)}
                            </div>
                        </div>
                    )
                })}

                <button className="button-primary" type="submit">
                    Check answers
                </button>
            </form>


        ) : (
            <h1>Loading</h1>
        )}
        </div>
    )
}