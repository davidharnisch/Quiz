import React from "react";
import AnswerButton from "./StartQuiz"

export default function QuizItem(props) {

    const [isSelected, setIsSelected] = React.useState(false)  

    return (
    <div>
        <h3>{props.question}</h3>
        {props.choices.map((choice) => {
                  
            const styles = {
                backgroundColor: choice.isSelected ? "#D6DBF5" : "white",
              }; 
              //console.log(JSON.stringify(item))
            return (
                <AnswerButton
              key={choice.id}
              onClick={() => {
                props.holdAnswer(choice.id);
              }}
              style={styles}
            >
              {choice}
            </AnswerButton>
                )
             })}
    </div>  
    )
}