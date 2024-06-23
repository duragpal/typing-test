import React from "react";
import PropTypes from "prop-types";
import "../styles/Keyboard.css";

const Keyboard = ({ highlightedKey }) => {
  const rows = [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backsp"],
    ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
    ["CapsLk", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
    ["Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Shift"],
    ["Ctrl", "Meta", "Alt", "Space", "Alt", "Meta", "Menu", "Ctrl"],
  ];

  return (
    <div className="Keyboard">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="Keyboard-row">
          {row.map((key) => (
            <div
              key={key}
              className={`Keyboard-key ${
                highlightedKey.toUpperCase() === key ? "highlighted" : ""
              }`}
            >
              {key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

Keyboard.propTypes = {
  highlightedKey: PropTypes.string,
};

export default Keyboard;
