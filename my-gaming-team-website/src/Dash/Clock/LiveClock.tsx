import React, { useEffect, useState } from "react";

const LiveClock: React.FC = () => {
  const [clock, setClock] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const time = now.toLocaleTimeString("en-ZA", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setClock(time);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-lg bg-white shadow px-4 py-2 rounded-md font-mono text-gray-700">
      {clock}
    </div>
  );
};

export default LiveClock;
