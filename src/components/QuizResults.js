import React from "react";

export default function QuizResults(props) {

    return (
        <div className='quiz-result-container'>
            <h3>You scored {props.scores}/5 correct answers</h3>
            <button className='button-base-style quiz-btn' onClick={props.newQuizHandler}>
                Play again
            </button>
        </div>
    );
}