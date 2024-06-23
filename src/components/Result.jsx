// Result.js

import React from "react";
import PropTypes from "prop-types";
import "../styles/Result.css";

const Result = ({ elapsedTime, wpm, restartTest }) => {
  return (
    <div className="Result">
      <h2>Test Completed!</h2>
      <p>Time: {elapsedTime.toFixed(1)} seconds</p>
      <p>Speed: {wpm} WPM</p>
      <button onClick={restartTest}>Restart Test</button>
    </div>
  );
};

Result.propTypes = {
  elapsedTime: PropTypes.number.isRequired,
  wpm: PropTypes.number.isRequired,
  restartTest: PropTypes.func.isRequired,
};

export default Result;
