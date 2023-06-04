import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Menu from './Menu'
import Question from './Question'
import './App.css'
import {decode} from 'html-entities'
import Confetti from 'react-confetti'

function App() {
  const [hasGameStarted, setHasGameStarted] = useState(false)
  const [isGameOver, setIsGameOver] = useState(true)
  const [questions, setQuestions] = useState([])
  
console.log(questions)

let score = 0

questions.forEach(question => {
  question.selectedAnswerId === question.correctAnswerId ? score = score + 1: score
})

console.log(score)

let disableBtn = questions.every(question => question.selectedAnswerId)

 console.log(disableBtn)

  const renderGame = () => {
    setHasGameStarted(prevState => !prevState)
    setIsGameOver(prevState => !prevState)
  }

  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5)

  const checkAnswers = () => {
    setIsGameOver(prevState => !prevState)
  }

  useEffect(()=>{

    fetch('https://opentdb.com/api.php?amount=5')
      .then(res => res.json())
      .then(data => {

        setQuestions(data.results.map(q => {
          const correctAnswer = {
            id: nanoid(),
            answer: decode(q.correct_answer),
          }
          const incorrectAnswers = q.incorrect_answers.map(answer => ({
            id: nanoid(),
            answer: decode(answer),
          })) 
          const answersArray = [...incorrectAnswers, correctAnswer] 
          return {
            id: nanoid(),
            question: decode(q.question),
            correctAnswerId: correctAnswer.id,
            selectedAnswerId: null,
            answers: shuffleArray(answersArray)
          }
        })
      )})
  }, [])

  const resetGame = () => {
    fetch('https://opentdb.com/api.php?amount=5')
      .then(res => res.json())
      .then(data => {

        setQuestions(data.results.map(q => {
          const correctAnswer = {
            id: nanoid(),
            answer: decode(q.correct_answer),
          }
          const incorrectAnswers = q.incorrect_answers.map(answer => ({
            id: nanoid(),
            answer: decode(answer),
          })) 
          const answersArray = [...incorrectAnswers, correctAnswer] 
          return {
            id: nanoid(),
            question: decode(q.question),
            correctAnswerId: correctAnswer.id,
            selectedAnswerId: null,
            answers: shuffleArray(answersArray)
          }
        })
      )})
    setHasGameStarted(prevState => !prevState)
    score = 0
  }

  const questionElement = questions ? questions.map(question => {
    return(
      <Question 
        key={question.id}
        questionId={question.id}
        question={question.question}
        correctAnswerId={question.correctAnswerId} 
        selectedAnswerId={question.selectedAnswerId}
        answers={question.answers}
        setQuestions={setQuestions}
        isGameOver={isGameOver}
        />
    )
  }) : <p>Loading data...</p>
  

  return(
    <div className='app-container'>
      {
        hasGameStarted  ? 
        <div className='game-container'>
          {questionElement}
          {isGameOver && score === questions.length && <Confetti />}
          {!isGameOver ? 
          
          <button
            className='check-answers-btn' 
            onClick={() =>checkAnswers()}
            type='submit'
            disabled={!disableBtn}
            >
              {disableBtn ? "Check your answers 🤓" : "Select your answers 🤔"}
          </button>
          :
          <div className='score-reset-btn-container'>
            <h3 className='user-score'>Your score is {score}/{questions.length}</h3>
            <button
            className='reset-btn' 
            type='reset'
            onClick={resetGame} 
            >
            {score === questions.length ? "Congrats! New game 😎" : "Try again! 😀"}
            </button>
          </div> }
      </div>
          
        : <Menu startGame={renderGame}
                isGameOver={isGameOver}/> 
      }
    </div>
  )
}

export default App
