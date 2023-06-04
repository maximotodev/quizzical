import React from 'react'
import './Question.css'
import classNames from "classnames";

function Question(props) {
    
    const handleChange = (id, selectedAnswerId) => {
        props.setQuestions(prevQuestions => {
              return prevQuestions.map(question => {
                  if (question.id === id) {
                    return {...question,
                        selectedAnswerId,
                    }
                } else {
                    return question  
                }
              })
                })
            }

    const answerElement = props.answers.map((answer, cod) => {
        
        return (
            <label
                key={cod}
                htmlFor={answer.id}
                className={classNames(
                    'answer-label',
                    {'answer-label--selected': !props.isGameOver && answer.id === props.selectedAnswerId},
                    {'answer-label--correct': props.isGameOver && answer.id === props.correctAnswerId},
                    {'answer-label--incorrect': props.isGameOver && answer.id !== props.correctAnswerId},
                    {'answer-label--unselected': props.isGameOver && answer.id !== props.correctAnswerId && answer.id !== props.selectedAnswerId}
                    )}>
            {answer.answer}   
                <input 
                    className="answer-radio-btn"
                    type="radio" 
                    name={props.questionId} 
                    id={answer.id}
                    value={answer.answer}
                    onChange={() => handleChange(props.questionId, answer.id)}
                    required
                    disabled={props.isGameOver}/>
            </label>
            )})
    return (
            <div className='question-container'>
                <h3 className='question'>{props.question}</h3>
                <div className='answers-container'>
                    {answerElement}
                </div>
            </div>
       
    )
}

export default Question