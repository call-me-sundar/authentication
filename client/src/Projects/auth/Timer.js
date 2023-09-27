import React, { useState, useEffect } from 'react';

export default function Timer() {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if(seconds > 0){
        const interval = setInterval(() => {
            setSeconds(seconds - 1);
          }, 1000);
      
          // Clear the interval when the component unmounts or when seconds reach 0
          return () => {
            clearInterval(interval);
          };
    }
    else{
      alert('code is expiried')
    }
  }, [seconds]); // Include seconds as a dependency

    // Function to format seconds as "00:00"
    const formatTime = (timeInSeconds) => {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = timeInSeconds % 60;
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

  return (
      <span>{formatTime(seconds)}</span>
  );
}
