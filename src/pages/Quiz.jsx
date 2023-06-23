import React, { useContext } from "react";
import Confetti from "react-confetti"
import { Link } from "react-router-dom";

import { QuizContext } from "../components/QuizContext";
import Question from "../components/Question";
import { nanoid } from "nanoid";

export default function Quiz(){
    const {questions, quizAttributes, quizMarked, markQuiz, score, setQuizMarked, changeQuizState} = useContext(QuizContext)
    const questionsHtml = questions.map(question => (
        <Question key={nanoid()} question={question}/>
    ))

    function handleClick(e){
        e.target.textContent === "Mark Quiz" ?
        markQuiz() :
        changeQuizState()
    }

    return (
        <section className="quiz-page">
            {quizMarked && score === questions.length && <Confetti />}
            <div id="quiz" className='quiz'>
                <div className='quiz-cnt'>
                    <h1>Quizzical</h1>
                    {questions.length === quizAttributes.count  && questionsHtml}
                    {questions.length !== quizAttributes.count && <p className='sorry-msg'>Sorry, there isn't enough questions in our database to fulfill your request. Please, try a lower number of questions or an alternative category/difficulty.</p>}
                    {quizMarked && <p className="quiz-score">You scored {score}/{questions.length} correct answers</p>}
                    <div className="btn-cnt">
                        <button className="quiz-btn mark-quiz" onClick={handleClick}>{quizMarked ? "Play Again" : "Mark Quiz"}</button>
                        {quizMarked && <Link to="/"><button className="quiz-btn change-quiz" onClick={() => setQuizMarked(prevState => !prevState)}>Change Quiz</button></Link>}
                    </div>
                </div>
            </div>
        </section>
    )

}