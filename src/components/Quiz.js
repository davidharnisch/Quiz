import React from "react"
import { nanoid } from "nanoid";
import QuizItem from "./QuizItem";

export default function Quiz() {
    
    const [allQuiz, setAllQuiz] = React.useState([])
    const [isRunning, setIsRunning] = React.useState(false) 


    React.useEffect(() => {
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

/*
      React.useEffect(() => {
        fetchRequest();
      }, []);
    
      function fetchRequest() {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
          .then((response) => response.json())
          .then((data) => {
            setAllQuiz((prev) => {
              const arr = data.results.map((que) => {
                let choices = [...que.incorrect_answers, que.correct_answer];
                choices = choices.sort(() => Math.random() - 0.5);
                const firstChoice = {
                    first: choices[0],
                    id: nanoid()
                }
                return {
                firstChoice: firstChoice,
                  question: que.question,
                  choices: choices,
                  correct_answer: que.correct_answer,
                  checked: "",
                  id: nanoid(),
                };
              });
              return arr;
            });
          });
      }*/

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
   /* function decodeHtml(html) {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
      }*/
/*
    const quizElements = questionTen.map(element => {
    return <div>
            <div>{decodeHtml(element.question)}</div>
             <a>{decodeHtml(element.incorectanswer[1])},</a><a>{decodeHtml(element.incorectanswer[0])},</a><a>{decodeHtml(element.incorectanswer[2])},</a><a>{decodeHtml(element.correctanswer)}</a>     
         </div>
})*/


function startQuiz() {
    if (isRunning === false) {
    setIsRunning(true)
    }
    console.log("all quiz:" + JSON.stringify(allQuiz))
}
/*
function holdID(id) {
    //console.log("all quiz:" + JSON.stringify(allQuiz))
    console.log(id)
    setAllQuiz(prevQuiz =>  prevQuiz.map((quiz) => {
        return (quiz.id === id) ?
        {...quiz, isSelected: !quiz.isSelected} :
        quiz
      })
    )
  }
*/


function holdAnswer(quizId, choiceId) {
    setAllQuiz((oldQuiz) =>
      oldQuiz.map((quiz) => {
        if (quiz.id !== quizId) return quiz;
        return {
          ...quiz,
          choices: quiz.choices.map((choice) =>
            choice.id === choiceId
              ? // If the choice selected is the current choice, toggle its selected state
                { ...choice, isSelected: !choice.isSelected }
              : // Otherwise, deselect the choice
                { ...choice, isSelected: false }
          ),
        };
      })
    );
  }

  


/*
const styles = {
        backgroundColor: allQuiz.isSelected ? "#59E391" : "white"
    }
*/
/*const quizElements = allQuiz.map(element => {
    return <div>
            <div>{decodeHtml(element.question)}</div>
            <div>
                <button style={styles} onClick={() => holdID(element.id)}>{element.choices[0].choice}</button> 
                <button style={styles} onClick={() => holdID(element.id)}>{element.choices[1].choice}</button> 
                <button style={styles} onClick={() => holdID(element.id)}>{element.choices[2].choice}</button> 
                <button style={styles} onClick={() => holdID(element.id)}>{element.choices[3].choice}</button>
            </div>
         </div>
})*/

/*
function chooseAnswer(event, id) {
    setAllQuiz((prevForm) =>
      prevForm.map((prev) => {
        console.log(prev.id)
        return prev.id === id ? { ...prev, checked: event.target.value } : prev;
      })
    );
  }*/

const quizElements = allQuiz.map((item) => {
    return (
      <QuizItem
        key={item.id}
       // id={item.id}
        question={item.question}
        choices={item.choices}
       // isSelected = {item.isSelected}
        holdAnswer={(id) => holdAnswer(item.id, id)}
        //handleChange={() => holdID(item.id)}
       // checked={item.checked}
        correct={item.correct}
      />
      );
    });


    return (    
        <main>
            <div className="form">
                {isRunning && <div>{quizElements}</div>}
                {!isRunning && <h1>Quiz</h1>}
                {!isRunning &&
                <button 
                    onClick={startQuiz}
                    className="form--button"
                >
                    test
                </button>}
            </div>
        </main>
    )
}