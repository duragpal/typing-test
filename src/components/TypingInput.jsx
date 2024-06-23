import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const TypingInput = ({ onInputChange }) => {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only allow alphanumeric characters, space, and punctuation
      if (/^[a-zA-Z0-9\s.,!?;:'"-]$/.test(e.key)) {
        const newChar = e.key;
        setTypedText((prevText) => prevText + newChar);
        onInputChange(newChar);
      } else if (e.key === "Backspace") {
        handleBackspace();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onInputChange]);

  const handleBackspace = () => {
    setTypedText((prevText) => prevText.slice(0, -1));
    onInputChange("Backspace");
  };

  return <></>;
};

TypingInput.propTypes = {
  onInputChange: PropTypes.func.isRequired,
};

export default TypingInput;
