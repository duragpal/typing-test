import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Timer = ({ startTime }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((Date.now() - startTime) / 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  return <div className="Timer">Time: {time.toFixed(1)}s</div>;
};

Timer.propTypes = {
  startTime: PropTypes.number.isRequired,
};

export default Timer;
