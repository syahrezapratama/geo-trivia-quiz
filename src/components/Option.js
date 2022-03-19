import React from 'react';

export default function Option(props) {

    function setClass(option){
        if (option.isSelected) {
            return 'isSelected'
        }
    }
    return(
        <div
            className={`options ${setClass(props.option)}`}
            onClick={props.selectAnswer}
        >
            {props.option}
        </div>
    );
}