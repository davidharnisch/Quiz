import React from "react";

export default function StartQuiz(props) {
  return (
      <div className='start-quiz-container'>
          <h1 className='start-quiz-header'>Quiz game</h1>
          <div className='quiz-options-container'>
          </div>
          <button className='button-base-style' onClick={props.startBtnHandler}>
              Start quiz
          </button>
      </div>
  );
}