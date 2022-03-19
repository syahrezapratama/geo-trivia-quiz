import React from 'react';
import { nanoid } from 'nanoid';
import { decode } from 'html-entities';
import Option from './Option';

export default function Question(props) {

    return(
        <h4>{decode(props.question)}</h4>
    );
}