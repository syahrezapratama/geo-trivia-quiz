import React from 'react';

export default function StartScreen(props) {
    return(
        <div className='startScreen'>
            <h1 className='title'>
                Geo Trivia Quiz
            </h1>
            <p className='startScreen-text'>
                Test your Geography knowledge!
                In each game you will be given five random questions 
                about Geography to answer. Good luck!
            </p>
            <button className='button' onClick={props.startQuiz}>
                Start Quiz
            </button>
        </div>
    );
}