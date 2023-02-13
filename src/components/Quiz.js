import '../style/Style.css';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import QuizResult from "./QuizResults";

export default function Quiz(props) {
    const [quiz, setQuiz] = useState([]);
    const [scores, setScores] = useState(undefined);

    useEffect(() => {
        function decodeHtml(html) {
            const txt = document.createElement("textarea");
            txt.innerHTML = html;
            return txt.value;
          }
        console.log(`USE EFFECT!!!!`);
        fetch(`https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple`)
            .then(res => res.json())
            .then(data => {
                const quizArray = data.results.map((question) => {
                    const answersArray = createAnswersArray(question.correct_answer, question.incorrect_answers);
                    return {
                            id: nanoid(),
                            question: decodeHtml(question.question),
                            answers: answersArray,
                            correctAnswer: decodeHtml(question.correct_answer)
                    };
                });
                setQuiz(quizArray);
            });
            
        function createAnswersArray(correctAnswer, incorrectAnswersArr) {
            const arrayCopy = [...incorrectAnswersArr];
            const answersArray = [];
            arrayCopy.splice(Math.floor(Math.random() * 4), 0, correctAnswer);
            arrayCopy.map(answer => 
                answersArray.push( 
                    {
                        id: nanoid(),
                        answer: decodeHtml(answer), 
                        selected: false,
                        style: 'answer-wrapper unselected-answer'
                    }
                )
            );
            return answersArray;
        }
    }, []);
    //console.log("all quiz" + JSON.stringify(quiz));

    function renderQuiz() { 
        return quiz.map((question, key) => {
            return ( 
                <div key={key} className={JSON.stringify(key)}>
                    <p className='question-text'>{question.question}</p>
                    <div className='answers-container' id={question.id}>
                        {createAnswersElements(question.answers)}
                    </div>
                </div>
            );
        });
    }

    function createAnswersElements(answersArr) {
        return answersArr.map((answer, key) => {
            return (
                <div key={key} id={answer.id} className={answer.style} onClick={answerClickHandler}>
                    <p>{answer.answer}</p>
                </div>
            );
        });
    }

    function answerClickHandler(e) {
        if (scores === undefined) {
            const selectedAnswerId = e.currentTarget.id;
            const questionId = e.currentTarget.parentElement.id;
            setQuiz(oldQuiz => oldQuiz.map(question => {
                if (questionId === question.id) {
                    return {
                        ...question,
                        answers: question.answers.map(answer => {
                            if (answer.id === selectedAnswerId) {
                                return {
                                    ...answer,
                                    selected: true,
                                    style: 'answer-wrapper selected-answer'
                                };
                            } else {
                                return {
                                    ...answer,
                                    selected: false,
                                    style: 'answer-wrapper unselected-answer'
                                };
                            }
                        })
                    };  
                } else {
                    return question;
                }
            }));
        }
    }

    function checkAnswers() {
        let correctAnswers = 0;
        for (let question of quiz) {
            for (let answer of question.answers) {
                if (answer.selected && answer.answer === question.correctAnswer) {
                    correctAnswers += 1;
                    answer.style = 'answer-wrapper correct-answer';
                } else if (answer.selected && answer.answer !== question.correctAnswer) {
                    answer.style = 'answer-wrapper incorrect-answer';
                } else if (answer.answer === question.correctAnswer) {
                    answer.style = 'answer-wrapper correct-answer';
                }
            };
        };
        setScores(correctAnswers);
    }


    return (
        <div className='quiz-container'>
            {renderQuiz()}
            {scores === undefined ? 
                <button onClick={checkAnswers}>Check answers</button> : 
                <QuizResult scores = {scores} newQuizHandler={props.newQuizHandler} />
            }
        </div>
    );
}