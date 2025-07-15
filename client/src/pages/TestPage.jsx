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
    question: "What does HTML stand for?",
    options: ["HyperText Markup Language", "HighText Machine Language", "Hyperlink Text Mark Language", "None of the above"],
    answer: "HyperText Markup Language",
  },
  {
    question: "Which tag is used to define a hyperlink in HTML?",
    options: ["<a>", "<link>", "<href>", "<url>"],
    answer: "<a>",
  },
  {
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Syntax", "Control Style Sheets"],
    answer: "Cascading Style Sheets",
  },
  {
    question: "Which CSS property controls the text color?",
    options: ["color", "text-color", "font-color", "background-color"],
    answer: "color",
  },
  {
    question: "Which symbol is used for comments in Python?",
    options: ["#", "//", "/*", "<!--"],
    answer: "#",
  },
  {
    question: "Which keyword is used to define a function in Python?",
    options: ["def", "func", "void", "define"],
    answer: "def",
  },
  {
    question: "What is the correct extension for Python files?",
    options: [".py", ".pyt", ".python", ".pt"],
    answer: ".py",
  },
  {
    question: "What is the output of `len([1, 2, 3])`?",
    options: ["3", "2", "1", "None"],
    answer: "3",
  },
  {
    question: "What is JVM in Java?",
    options: ["Java Virtual Machine", "Java Variable Method", "Java Verified Memory", "None of the above"],
    answer: "Java Virtual Machine",
  },
  {
    question: "Which keyword is used for inheritance in Java?",
    options: ["extends", "inherits", "super", "implements"],
    answer: "extends",
  },
  {
    question: "Which method is the starting point in a Java program?",
    options: ["main()", "start()", "run()", "init()"],
    answer: "main()",
  },
  {
    question: "What is the default value of boolean in Java?",
    options: ["false", "true", "null", "0"],
    answer: "false",
  },
  {
    question: "What is an API?",
    options: ["Application Programming Interface", "Applied Program Interaction", "Automatic Processing Interface", "None of the above"],
    answer: "Application Programming Interface",
  },
  {
    question: "What is Git used for?",
    options: ["Version control", "Building apps", "Designing UI", "Database management"],
    answer: "Version control",
  },
  {
    question: "What does HTTP stand for?",
    options: ["HyperText Transfer Protocol", "HighText Transfer Protocol", "HyperTool Transfer Protocol", "None"],
    answer: "HyperText Transfer Protocol",
  },
  {
    question: "What does IoT stand for?",
    options: ["Internet of Things", "Input on Technology", "Intranet of Technology", "None"],
    answer: "Internet of Things",
  },
  {
    question: "Which company developed Android OS?",
    options: ["Google", "Microsoft", "Samsung", "Apple"],
    answer: "Google",
  },
  {
    question: "Which programming language is used for client-side web interactivity?",
    options: ["JavaScript", "HTML", "Python", "Java"],
    answer: "JavaScript",
  },
  {
    question: "What is 5G?",
    options: ["5th generation of mobile networks", "5 GB data", "5th generation of computers", "None of the above"],
    answer: "5th generation of mobile networks",
  },
  {
    question: "What is a VPN used for?",
    options: ["Virtual Private Network", "Voice Processing Network", "Verified Private Network", "None of the above"],
    answer: "Virtual Private Network",
  }
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
        await fetch(`${import.meta.env.VITE_BACKEND}/api/student/submit`||"http://localhost:5000/api/student/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, score: percentage }),
        });

        const certRes = await fetch(`${import.meta.env.VITE_BACKEND}/api/send-certificate`||"http://localhost:5000/api/send-certificate", {
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
    <>
    <div className="test-container">
     <img src="log1.png" alt="" width="90px" />
         <h1 className="l3">Livewire Learner's License</h1>
         <img className="l3img" src="Livewire Logo.png" alt=""  width="250px"/>
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
    </>
  );
}
