
import React, { useState } from "react";
import axios from "axios";

export default function Certificate() {
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [score, setScore] = useState(localStorage.getItem("latestScore") || "");
  const [message, setMessage] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND}/api/send-certificate`||"http://localhost:5000/api/send-certificate", {
        email,
        name,
        score,
      });
      console.log(res);
      setMessage("Certificate sent successfully ✅");
    } catch (err) {
      setMessage("❌ Failed to send certificate. " + err.response?.data?.error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSend}>
        <h2 className="mb-4">Send Certificate</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          required
        />
        <button type="submit">Send Certificate</button>
        {message && <p className="mt-4 text-center">{message}</p>}
      </form>
    </div>
  );
}
