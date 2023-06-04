import React from 'react'
import './Menu.css'

function Menu(props) {
    return (
        <div className="menu">
            <h1 className='title--menu'>Quizzical</h1>
            <span className='description--menu'>Trivia Game</span>
            <button onClick={() => props.startGame()}className="start-btn--menu">Start Quizzical</button>
        </div>
    )
}

export default Menu