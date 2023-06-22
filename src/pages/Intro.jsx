import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";

import { QuizContext } from "../components/QuizContext";

export default function Intro(){
    const {quizAttributes, setQuizAttributes, changeQuizState} = useContext(QuizContext)
    const [categoriesArray, setCategoriesArray] = useState([])
    const difficultyArray = ["Any Difficulty", "Easy", "Medium", "Hard"]

    useEffect(() => {
        fetchCategories()
    }, [])

    async function fetchCategories(){
        const response = await fetch('https://opentdb.com/api_category.php')
        let data = await response.json()
        data = data.trivia_categories.map((category) => {
            return {name: category.name}
        })
        setCategoriesArray([{name:"Any Category"}].concat(data))
    }

    const categoriesHTML = categoriesArray.map((category, index) => {
        return (
            <option key={category.name} value={category.name === "Any Category" ? 0 : index+8}>{category.name}</option>
        )
    })

    const difficultyHTML = difficultyArray.map(item => {
        return (
            <option key={nanoid()} value={item === "Any Difficulty" ? 0 : item}>{item}</option>
        )
    })

    return (
        <section className="intro">
            <div className="intro-cnt">
                <h1>Quizzical</h1>
                <p>Get ready to put your trivia knowledge to the test</p>
                <div className="sel-panel">
                    <label>Number of questions:</label>
                    <input value={quizAttributes.count} className="intro-input" type="number" min="1" max="50" onChange={(event) => setQuizAttributes(prevState => {
                        let { value, min, max } = event.target;
                        value = Math.max(Number(min), Math.min(Number(max), Number(value)));
                        return {...prevState, count: value}
                    }) } />
                </div>
                <div className="sel-panel">
                    <label>Select a category:</label>
                    <select name="categories" value={quizAttributes.category} className="start--input" onChange={(event) => setQuizAttributes(prevState => {
                        return {...prevState, category: event.target.value}
                    }) } >
                        {categoriesHTML}
                    </select>
                </div>
                <div className="sel-panel">
                    <label>Select a difficulty:</label>
                    <select name="difficulties" value={quizAttributes.difficulty} className="intro--input" onChange={(event) => setQuizAttributes(prevState => {
                        return {...prevState, difficulty: event.target.value}
                    })}>
                        {difficultyHTML}
                    </select>
                </div>
                <Link to="/quiz"><button className="start--btn" onClick={changeQuizState}>Start Quiz</button></Link>
            </div>
        </section>
    )
}