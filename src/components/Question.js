import React from 'react';
import { nanoid } from 'nanoid';
import { decode } from 'html-entities';

export default function Question(props) {

    const optionElements = props.answers.map((answer, answerIndex) => {
        return (
            <div 
                className={`${props.gameIsFinished ? 'answer-checked' : ''}`}
                key={nanoid()}
            >
                <input 
                    type='radio'
                    name={props.questionIndex}
                    id={`${props.questionIndex}-${answerIndex}`}
                    value={answer}
                    checked={props.formData === answer}
                    onChange={props.handleChange}
                    className={`option-radio`}
                    disabled={props.gameIsFinished}
                />
                <label
                    htmlFor={`${props.questionIndex}-${answerIndex}`}
                    className={
                        `option-label 
                        ${props.gameIsFinished && answer === props.question.correct_answer
                            ? 'option-label-correct'
                            : ''
                        }`}
                >
                    {decode(answer)}
                </label>
            </div>
        );
    });
    
    return(
        <div className='questionBox'>
            <h4>{decode(props.question.question)}</h4>
            <form>
                <div className='optionsContainer'>
                    {optionElements}
                </div>
            </form>
        </div>
    );
}