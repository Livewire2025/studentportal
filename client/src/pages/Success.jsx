import React, { useEffect, useState } from "react";


export default function Success() {
  const [score, setScore] = useState(null);

  useEffect(() => {
    const storedScore = localStorage.getItem("latestScore");
    if (storedScore) {
      setScore(storedScore);
    }
  }, []);

  return (
    <>
      <div class="congrats-message">
        <h1>Congratulations!</h1>
        <p>You have successfully completed the test!</p>
        {score !== null && <p className="text">Your Score: <strong>{score}%</strong></p>}
      </div>

      <div class="confetti">
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
      </div>

      
    </>
  );
}