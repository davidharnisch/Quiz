import React from "react"
import { nanoid } from "nanoid";

export default function Quiz() {
    
    const [allQuiz, setAllQuiz] = React.useState([])    

    React.useEffect(() => {
        /* This function turns HTML element entities into normal words */
        function decodeHtml(html) {
          const txt = document.createElement("textarea");
          txt.innerHTML = html;
          return txt.value;
        }
    
        fetch(
          "https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple"
        )
          .then((res) => res.json())
          .then((data) => {
            const dataArray = data.results;
            const newDataArray = dataArray.map((item) => {
              return {
                question: decodeHtml(item.question),
                choices: [
                  {
                    choice: decodeHtml(item.correct_answer),
                    isSelected: false,
                    correct: decodeHtml(item.correct_answer),
                    id: nanoid(),
                  },
                  {
                    choice: decodeHtml(item.incorrect_answers[0]),
                    isSelected: false,
                    correct: decodeHtml(item.correct_answer),
                    id: nanoid(),
                  },
                  {
                    choice: decodeHtml(item.incorrect_answers[1]),
                    isSelected: false,
                    correct: decodeHtml(item.correct_answer),
                    id: nanoid(),
                  },
                  {
                    choice: decodeHtml(item.incorrect_answers[2]),
                    isSelected: false,
                    correct: decodeHtml(item.correct_answer),
                    id: nanoid(),
                  },
                ].sort(() => 0.5 - Math.random()),
                id: nanoid(),
              };
            });
            return setAllQuiz(newDataArray);
          });
      }, []);

console.log(allQuiz)

/*function getQuizData() {
    const randomNumber = Math.floor(Math.random() * allQuiz.results.length)
    return {  
    value:  Math.floor(Math.random() * allQuiz.results.length),   
    question: allQuiz.results[randomNumber].question,
    incorectanswer: allQuiz.results[randomNumber].incorrect_answers,
    correctanswer: allQuiz.results[randomNumber].correct_answer,
    allanswer: [allQuiz.results[randomNumber].incorrect_answers + "," + allQuiz.results[randomNumber].correct_answer]
    }
}


const [questionTen, setQuestionTen] = React.useState([]);

function allNewQuestion() {
    
    for (let i = 0; i <= 9; i++) {
    setQuestionTen(oldArray => [...oldArray,getQuizData()] );
    //console.log("test")
  }  
}

console.log("questionten" + JSON.stringify(questionTen))*/

     /* This function turns HTML element entities into normal words */
    function decodeHtml(html) {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
      }
/*
    const quizElements = questionTen.map(element => {
    return <div>
            <div>{decodeHtml(element.question)}</div>
             <a>{decodeHtml(element.incorectanswer[1])},</a><a>{decodeHtml(element.incorectanswer[0])},</a><a>{decodeHtml(element.incorectanswer[2])},</a><a>{decodeHtml(element.correctanswer)}</a>     
         </div>
})*/

const quizElements = allQuiz.map(element => {
    return <div>
            <div>{decodeHtml(element.question)}</div>
            <a>{element.choices[0].choice}</a> 
         </div>
})

    return (    
        <main>
            <div className="form">
                <div>{quizElements}</div>
                <button 
                    className="form--button"
                >
                    test
                </button>
            </div>
        </main>
    )
}