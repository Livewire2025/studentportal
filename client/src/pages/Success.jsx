import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Success() {
  const [score, setScore] = useState(null);

  useEffect(() => {
    const storedScore = localStorage.getItem("latestScore");
    if (storedScore) {
      setScore(storedScore);
    }
  }, []);

  return (
    <div className="thank">
      <h2 className="thankyou">🎉😊Congratulation!You have Completed the test 🎉😊</h2>
      {score !== null && <p className="text">Your Score: <strong>{score}%</strong></p>}
      <h2 className="thankyou">🎓Your Certification has been Send to your mail-Id.🎓</h2>
    </div>
  );
}