import React from "react";
import PropTypes from "prop-types";
import "../styles/TextSelector.css";

const TextSelector = ({ texts, onSelectText }) => {
  return (
    <div className="TextSelector">
      <select onChange={(e) => onSelectText(e.target.value)}>
        <option value="">Select a text</option>
        {texts.map((text) => (
          <option key={text.id} value={text.id}>
            {text.title}
          </option>
        ))}
      </select>
    </div>
  );
};

TextSelector.propTypes = {
  texts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelectText: PropTypes.func.isRequired,
};

export default TextSelector;
