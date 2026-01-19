import { useState, useEffect } from 'react'
import '../resources/scss/Quiz.scss'
import { shuffle, decodeHtml } from '../utils'

export default function Quiz() {
    
    type QuizItem = {
        question: string,
        correct_answer: string,
        incorrect_answers: string[],
        selected?: string,
        shuffledAnswers?: string[]
        
    }


    const apiUrl = 'https://opentdb.com/api.php?amount=10'

    const [quizData, setQuizData] = useState<QuizItem[]>([])

    useEffect(() => {
        fetchQuizData()
    }, [])

    function fetchQuizData() {
        console.log("fetching!")
        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Request failed')
                }
                return response.json()
            })
            .then((data) => {
                console.log('quiz data', data)
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
        return quizData
        console.log('data', quizData)
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
                                { item.shuffledAnswers?.map((answer, i) => {
                                    return (
                                        <button 
                                            type="button"
                                            key={i} 
                                            className={`button button-primary quiz-submit-button ${item.selected === answer ? 'is-selected' : ''}`} 
                                            onClick={() => selectAnswer(answer, item.question)}
                                        >
                                            { decodeHtml(answer) }
                                        </button>
                                    )
                                })}
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