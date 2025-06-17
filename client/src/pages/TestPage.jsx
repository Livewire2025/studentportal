import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Utility: Shuffle function
const shuffleArray = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const rawQuestions = [
  {
    question: "What is a primary key in a database?",
    options: ["A duplicate value", "A unique identifier", "A foreign key", "An index"],
    answer: "A unique identifier",
  },
  {
    question: "What is an API?",
    options: ["Application Programming Interface", "Applied Program Interaction", "Automatic Processing Interface", "None of the above"],
    answer: "Application Programming Interface",
  },
  {
    question: "What does HTTP stand for?",
    options: ["HyperText Transfer Protocol", "HighText Transfer Protocol", "HyperTool Transfer Protocol", "None"],
    answer: "HyperText Transfer Protocol",
  },
  {
    question: "What is the use of Git?",
    options: ["Project building", "Version control", "Deployment", "Coding"],
    answer: "Version control",
  },
  {
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Syntax", "Control Style Sheets"],
    answer: "Cascading Style Sheets",
  },
  {
    question: "What is machine learning?",
    options: ["A subset of AI", "A programming language", "A type of database", "None of the above"],
    answer: "A subset of AI",
  },
  {
    question: "What is a neural network?",
    options: ["A network of computers", "A series of algorithms", "A type of database", "None of the above"],
    answer: "A series of algorithms",
  },
  {
    question: "What does NLP stand for?",
    options: ["Natural Language Processing", "Neural Language Programming", "Network Language Protocol", "None of the above"],
    answer: "Natural Language Processing",
  },
  {
    question: "What is supervised learning?",
    options: ["Learning with labeled data", "Learning without labels", "Learning with human supervision", "None of the above"],
    answer: "Learning with labeled data",
  },
  {
    question: "What is overfitting?",
    options: ["Model performs well on training data but poorly on unseen data", "Model performs well on unseen data", "Model is too simple", "None of the above"],
    answer: "Model performs well on training data but poorly on unseen data",
  },
  {
    question: "What is Power BI?",
    options: ["A data visualization tool", "A programming language", "A database management system", "None of the above"],
    answer: "A data visualization tool",
  },
  {
    question: "What is DAX in Power BI?",
    options: ["Data Analysis Expressions", "Data Access Expressions", "Data Aggregation Expressions", "None of the above"],
    answer: "Data Analysis Expressions",
  },
  {
    question: "What is a Power BI report?",
    options: ["A collection of visualizations", "A single visualization", "A data model", "None of the above"],
    answer: "A collection of visualizations",
  },
  {
    question: "What is Power Query?",
    options: ["A data transformation tool", "A reporting tool", "A database", "None of the above"],
    answer: "A data transformation tool",
  },
  {
    question: "What is a dashboard in Power BI?",
    options: ["A single-page view of multiple reports", "A data model", "A type of visualization", "None of the above"],
    answer: "A single-page view of multiple reports",
  },
  {
    question: "What does IP stand for?",
    options: ["Internet Protocol", "Internal Protocol", "Interconnected Protocol", "None of the above"],
    answer: "Internet Protocol",
  },
  {
    question: "What is a subnet?",
    options: ["A smaller network within a larger network", "A type of router", "A network protocol", "None of the above"],
    answer: "A smaller network within a larger network",
  },
  {
    question: "What is a firewall?",
    options: ["A security system for networks", "A type of router", "A network protocol", "None of the above"],
    answer: "A security system for networks",
  },
  {
    question: "What does DNS stand for?",
    options: ["Domain Name System", "Dynamic Network Service", "Data Network System", "None of the above"],
    answer: "Domain Name System",
  },
  {
    question: "What is a VPN?",
    options: ["Virtual Private Network", "Virtual Public Network", "Variable Private Network", "None of the above"],
    answer: "Virtual Private Network",
  },
];

export default function TestPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(60);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Shuffle questions and their options on first mount
    const shuffledQuestions = shuffleArray(rawQuestions).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
    setQuestions(shuffledQuestions);
  }, []);

  useEffect(() => {
    if (questions.length === 0) return;
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev === 1) handleNext();
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQ, questions]);

  const handleSelect = (event) => {
    setSelected(event.target.value);
  };

  const handleNext = async () => {
    if (selected === null && time > 0) {
      alert("Please select an answer before proceeding.");
      return;
    }

    if (selected === questions[currentQ].answer) {
      setScore((prev) => prev + 1);
    }

    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setTime(60);
    } else {
      const email = localStorage.getItem("email") || prompt("Enter your email:");
      const name = localStorage.getItem("name") || prompt("Enter your name:");
      const percentage = Math.round(((score + (selected === questions[currentQ].answer ? 1 : 0)) / questions.length) * 100);

      try {
        await fetch("http://localhost:5000/api/student/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, score: percentage }),
        });

        const certRes = await fetch("http://localhost:5000/api/send-certificate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, name, score: percentage }),
        });

        const certData = await certRes.json();
        if (!certRes.ok) throw new Error(certData.error || "Certificate not sent");

        localStorage.setItem("latestScore", percentage);
        navigate("/success");
      } catch (err) {
        alert("Submission error: " + err.message);
      }
    }
  };

  if (questions.length === 0) return <p>Loading questions...</p>;

  return (
    <div className="test-container">
      <div className="test-header">
        <h3>
          Question {currentQ + 1} / {questions.length}
        </h3>
        <span className="timer">Time left: {time}s</span>
      </div>
      <h4 className="test-question">{questions[currentQ].question}</h4>
      <form className="option-form">
        {questions[currentQ].options.map((opt, index) => (
          <label key={index} className="option-label">
            <input
              type="radio"
              name="option"
              value={opt}
              checked={selected === opt}
              onChange={handleSelect}
            />
            {opt}
          </label>
        ))}
      </form>
      {selected && (
        <button className="next-button" onClick={handleNext}>
          {currentQ + 1 < questions.length ? "Next" : "Submit Test"}
        </button>
      )}
    </div>
  );
}
