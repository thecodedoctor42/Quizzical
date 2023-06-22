import React, {createContext, useState, useEffect} from "react";
import { nanoid } from 'nanoid'
import { decode } from "html-entities"

const QuizContext = createContext()

function QuizContextProvider(props) {

    const [quizMarked, setQuizMarked] = useState(false)
    const [questions, setQuestions] = useState([])
    const [fetchApi, setFetchApi] = useState(false)
    const [score, setScore] = useState(0)
    const [quizAttributes, setQuizAttributes] = useState({
        count: 10,
        category: "0",
        difficulty: "0",
    })
    const [quizState, setQuizState] = useState(false)
    
    React.useEffect(() => {
        fetchData();
    }, [fetchApi])

    React.useEffect(() => {
        if(!quizMarked){
            setFetchApi(prevState => !prevState)
        }
    }, [quizState, quizMarked])

    function changeQuizState(){
        setQuizState(prevQuizState => !prevQuizState)
    }

    function setAnswer(e){
        setQuestions(prevState => prevState.map(question => {
            return question.id === e.target.name ?
                {...question, selectedAnswer: decode(e.target.innerText)} :
                {...question}
        }))
    }

    function markQuiz(){
        const correctQuestions = questions.filter(question => 
            question.selectedAnswer === decode(question.correct_answer))
        setScore(correctQuestions.length)
        setQuizMarked(prevState => !prevState)
    }

    async function fetchData() {
        const response = await fetch(`https://opentdb.com/api.php?amount=${quizAttributes.count}${quizAttributes.category !== '0' ? `&category=${quizAttributes.category}` : ""}${quizAttributes.difficulty == '0' ? "" : `&difficulty=${quizAttributes.difficulty.toLowerCase()}`}`)
        const data = await response.json();
        setQuestions(data.results.map((question, index) => {
            let answersArray = question.incorrect_answers.concat(question.correct_answer)
            
            for (let i = answersArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [answersArray[i], answersArray[j]] = [answersArray[j], answersArray[i]];
            }

            return {...question, randomAnswers: answersArray, id: nanoid(), number: index+1}
        }))
    }

    return (
        <QuizContext.Provider value={{quizMarked, setQuizMarked, markQuiz, questions, score, setAnswer, quizAttributes, setQuizAttributes, quizState, changeQuizState}}>
            {props.children}
        </QuizContext.Provider>
    )
}

export {QuizContextProvider, QuizContext}