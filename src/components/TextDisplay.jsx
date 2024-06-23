import React from "react";
import PropTypes from "prop-types";
import "../styles/TextDisplay.css";

const TextDisplay = ({ text, inputText }) => {
  return (
    <div className="TextDisplay">
      <div className="OriginalText">{text}</div>
      <div className="TypedText">
        {inputText.split("").map((char, index) => (
          <span
            key={index}
            className={char === text[index] ? "correct" : "incorrect"}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

TextDisplay.propTypes = {
  text: PropTypes.string.isRequired,
  inputText: PropTypes.string.isRequired,
};

export default TextDisplay;
