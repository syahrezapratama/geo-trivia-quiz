import React from 'react';
import { nanoid } from 'nanoid';
import { decode } from 'html-entities';

export default function Question(props) {

    const options = props.options.map(option => {
        return (
            <div className='options' key={nanoid()}>{decode(option)}</div>
        );
    })

    return(
        <div className='questionBox'>
            <h4>{props.question}</h4>
            <div className='optionsContainer'>
                {options}
            </div>
        </div>
    );
}