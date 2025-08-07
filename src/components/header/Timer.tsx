import { Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { AiFillClockCircle } from "react-icons/ai";

const Timer: React.FC = React.memo(() => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Tooltip title={time}>
      <span className="crt-time header-right-icon" role="contentinfo">
        <AiFillClockCircle style={{ marginRight: 4 }} fontSize={20} />
        <span>{time}</span>
      </span>
    </Tooltip>
  );
});

export default Timer;