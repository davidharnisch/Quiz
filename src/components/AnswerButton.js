import React from "react";

export default function AnswerButton(props) {
  return (
    <button
      type={props.type || "button"}
      onClick={props.onClick}
      style={props.style}
      name={props.name}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}