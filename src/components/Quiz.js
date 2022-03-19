import React, { useEffect, useState } from 'react';
import arrayShuffle from 'array-shuffle';
import { nanoid } from 'nanoid';
import Question from './Question';
import Option from './Option';

export default function Quiz() {

    const [allQuestions, setAllQuestions] = useState([]);
    const [answers, setAnswers] = useState();


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
            const shuffledOptions = arrayShuffle([
                {
                    id: nanoid(),
                    option: optionsArr[0],
                    isSelected: false,
                    isCorrectAnswer: true
                },
                {
                    id: nanoid(),
                    option: optionsArr[1],
                    isSelected: false,
                    isCorrectAnswer: false
                },
                {
                    id: nanoid(),
                    option: optionsArr[2],
                    isSelected: false,
                    isCorrectAnswer: false
                },
                {
                    id: nanoid(),
                    option: optionsArr[3],
                    isSelected: false,
                    isCorrectAnswer: false
                }
            ]);
            questions.push({
                questionId: nanoid(),
                question: questionsArr[i].question,
                correctAnswer: questionsArr[i].correct_answer,
                options: shuffledOptions
            })
        }
        return questions;
    }
    
    function selectAnswer(option) {
        option.isSelected = true;
        console.log(option.isSelected);
    }

    const questions = allQuestions.map(question => {
        return (
            <div className='questionBox' key={question.questionId}>
                <Question
                    questionId={question.questionId}
                    question={question.question}
                    correctAnswer={question.correctAnswer}      
                />
                <div className='optionsContainer'>
                    {
                        question.options.map(option => {
                            return (
                                <Option
                                    key={option.id}
                                    option={option.option}
                                    isSelected={option.isSelected}
                                    selectAnswer={() => selectAnswer(option)}
                                />
                            );
                        })
                    }
                </div>
                
            </div>
            
        )
    });

    console.log(allQuestions);

    return(
        <div className='quizScreen'>
            <h1 className='title'>Geo Trivia Quiz</h1>
            {questions}
            <button className='button'>Check answers</button>
        </div>
    );
}