import React, { useEffect, useState } from 'react';
import arrayShuffle from 'array-shuffle';
import { nanoid } from 'nanoid';
import Question from './Question';

export default function Quiz() {

    const [allQuestions, setAllQuestions] = useState([]);


    // Fetch data from API and get questions
    useEffect(() => {
        async function getQuestions() {
            try {
                const res = await fetch('https://opentdb.com/api.php?amount=5&category=22&difficulty=easy&type=multiple');
                const toJSON = await res.json();
                const resultData = toJSON.results;
                setAllQuestions(makeQuestions(resultData));
            } catch (error) {
                console.log(error);
            }
        }
        getQuestions();
    }, []);

    // destructure question objects
    function makeQuestions(questionsArr) {
        const questions = [];
        // randomize options
        for (let i = 0; i < questionsArr.length; i++) {
            const optionsArr = [];
            optionsArr.push(
                questionsArr[i].correct_answer, 
                ...questionsArr[i].incorrect_answers
            );
            const shuffledOptions = arrayShuffle(optionsArr);
            questions.push({
                questionId: nanoid(),
                question: questionsArr[i].question,
                correctAnswer: questionsArr[i].correct_answer,
                options: shuffledOptions
            })
        }
        return questions;
    }
    
    console.log(allQuestions);

    const questions = allQuestions.map(question => {
        return (
            <Question 
                key={question.questionId}
                questionId={question.questionId}
                question={question.question}
                correctAnswer={question.correctAnswer}
                options={question.options}
            />
        )
    })

    return(
        <div className='quizScreen'>
            <h1 className='title'>Geo Trivia Quiz</h1>
            {questions}
            <button className='button'>Check answers</button>
        </div>
    );
}