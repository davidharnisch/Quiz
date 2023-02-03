import React from "react"

export default function Quiz() {
    
    const [allQuiz, setAllQuiz] = React.useState([])    

    React.useEffect(() => {
        async function getQuiz() {
            const res = await fetch("https://opentdb.com/api.php?amount=20")
            const data = await res.json()
            setAllQuiz(data)
        }
        getQuiz()
    }, [])


function getQuizData() {
    const randomNumber = Math.floor(Math.random() * allQuiz.results.length)
    return {  
    value:  Math.floor(Math.random() * allQuiz.results.length),   
    question: allQuiz.results[randomNumber].question
    }
}


const [questionTen, setQuestionTen] = React.useState([]);

function allNewDice() {
    
    for (let i = 0; i <= 9; i++) {
    setQuestionTen(oldArray => [...oldArray,getQuizData()] );
    console.log("test")
  }
  
}


console.log(questionTen)

     /* This function turns HTML element entities into normal words */
    function decodeHtml(html) {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
      }

    const diceElements = questionTen.map(die => <div>{decodeHtml(die.question)}</div>)

    return (
        <main>
            <div className="form">
                <div>{diceElements}</div>
                <button 
                    className="form--button"
                   onClick={allNewDice}
                >
                    test
                </button>
            </div>
        </main>
    )
}