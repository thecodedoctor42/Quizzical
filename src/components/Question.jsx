import React, {useContext} from "react"
import { nanoid } from "nanoid"
import { QuizContext } from "./QuizContext"
import { decode } from "html-entities"

function Question({question}) {
    const { quizMarked, setAnswer } = useContext(QuizContext)

    const answerButtons = question.randomAnswers.map(answer => {
        function getBackgroundColor(){
            if (quizMarked){
                if(decode(question.correct_answer) === decode(answer)){
                    return "#32af4d"
                }
                else if (question.selectedAnswer === decode(answer)){
                    return "#d14b4b"
                }
            }
            else {
                return question.selectedAnswer === decode(answer) ? "#202020" : "#fae886"
            }
        }

        const style = {
            backgroundColor: getBackgroundColor(),
            borderColor: "#202020",
            color:  question.selectedAnswer === decode(answer) ? "#fae886" : 
                    !quizMarked ? "black" :
                    answer === question.correct_answer ? 
                    "white" : "gray",
            gridColumn: question.type === "boolean" ? "span 2" : ""
        }

        return (
            <button
                key={nanoid()}
                onClick={setAnswer}
                disabled={quizMarked}
                style={style}
                className="answer"
                name={question.id}
            >
                {decode(answer)}
            </button>
        )
    })

    return (
        <div key={question.id} className="question-cnt">
            <p>{question.number}. {decode(question.question)}</p>
            <div className='answer-btns'>
                {answerButtons}
            </div>
        </div>
    )
}


export default Question