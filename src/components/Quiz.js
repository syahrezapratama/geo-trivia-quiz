import React, { useEffect, useState } from 'react';
import arrayShuffle from 'array-shuffle';
import { nanoid } from 'nanoid';
import Question from './Question';
import Spinner from './Spinner';

export default function Quiz() {

    const [allQuestions, setAllQuestions] = useState([]);
    const [allAnswers, setAllAnswers] = useState([]);
    const [formData, setFormData] = useState([]);
    const [gameIsFinished, setGameIsFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [newGame, setNewGame] = useState(false);


    // Fetch data from API and get questions
    useEffect(() => {
        async function getQuestions() {
            try {
                const res = await fetch('https://opentdb.com/api.php?amount=5&category=22&difficulty=easy&type=multiple');
                const toJSON = await res.json();
                const resultData = toJSON.results;
                setAllQuestions(resultData);
            } catch (error) {
                console.log(error);
            }
        }
        getQuestions();
    }, [newGame]);

    useEffect(() => {
        allQuestions.forEach(question => {
            const optionsArr = [];
            optionsArr.push(question.correct_answer, ...question.incorrect_answers);
            const shuffledOptions = arrayShuffle(optionsArr);

            setAllAnswers(prevAnswers => {
                return [...prevAnswers, shuffledOptions];
            });

            setFormData(prevFormData => {
                return [...prevFormData, ''];
            });
        });
    }, [allQuestions]);

    function handleChange(event, index) {
        const { value } = event.target;
        setFormData(prevFormData => {
            const dataArray = [...prevFormData];
            dataArray.splice(index, 1, value);
            return dataArray;
        });
    }

    function handleClick() {
        if(!gameIsFinished) {
            setGameIsFinished(true);
            allQuestions.forEach((question, index) => {
                if(formData[index] === question.correct_answer) {
                    setScore(prevScore => prevScore + 1);
                }
            });
        }
        // reset score and show new questions
        else {
            setGameIsFinished(false);
            setScore(0);
            setAllQuestions([]);
            setAllAnswers([]);
            setFormData([]);
            setNewGame(prevState => !prevState);
        }
    }

    const questionElements = allQuestions.map(function(_, index) {
        // only return question elements if the answers are ready
        if (!allAnswers) {
            return;
        }
        return (
            <Question
                question={allQuestions[index]}
                questionIndex={index}
                answers={allAnswers[index]}
                gameIsFinished={gameIsFinished}
                formData={formData[index]}
                handleChange={(event) => handleChange(event, index)}
                key={nanoid()}
            />
        );
    });
    
    // console.log(allQuestions);
    // console.log(allQuestions, allAnswers);

    if (allAnswers.length > 0) {
        return (
            <div className='quizScreen'>
                <h1 className='title'>Geo Trivia Quiz</h1>
                {questionElements}
                <div className='resultContainer'>
                    {
                        gameIsFinished && 
                        <p>
                            You scored {score} / 5 correct answers!
                        </p>
                    }
                    <button className='button' onClick={handleClick}>
                        {!gameIsFinished ? 'Check answers' : "Play again"}
                    </button>
                </div>
                
            </div>
        );
    }
    else {
        return <Spinner />
    }
    
}