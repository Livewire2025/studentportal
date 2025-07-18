import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    clgCourse: "",
    careerStatus: ""
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND
          ? `${import.meta.env.VITE_BACKEND}/api/student/register`
          : "http://localhost:5000/api/student/register",
        formData
      );
      localStorage.setItem("email", formData.email);
      localStorage.setItem("name", formData.name);
      navigate("/test");
    } catch (err) {
      alert("Registration failed: " + (err.response?.data?.message || "Please try again."));
    } finally {
      setLoading(false);
    }
  };

  const clgCourseOptions = ["BSc", "BCA", "B.E", "B.Tech", "MSc", "MCA"];
  const careerStatusOptions = [
    "Student",
    "Entrepreneur",
    "Job Seeker",
    "Working Professional"
  ];

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <img src="log1.png" alt="" width="90px" />
      <h1 className="l3">Livewire Learner's License</h1>
      <img className="l3img" src="Livewire Logo.png" alt="" width="250px" />
      <h2>Online Assessment Registration</h2>
      <p>Create your account to access exams and results</p>

      <div className="form">
        {["name", "email", "phone", "college"].map((key) => (
          <div key={key}>
            <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <input
              type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
              id={key}
              placeholder={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div>
          <label htmlFor="clgCourse">Qualification</label>
          <select
            name="clgCourse"
            value={formData.clgCourse}
            onChange={handleChange}
            required
          >
            <option value="">Select College Course</option>
            {clgCourseOptions.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        <div className="radio-group">
          {careerStatusOptions.map((status) => (
            <label key={status} className="radio-option">
              <input
                type="radio"
                name="careerStatus"
                value={status}
                checked={formData.careerStatus === status}
                onChange={handleChange}
                required
              />
              {status}
            </label>
          ))}
        </div>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? (
          <>
            <span className="spinner" /> Submitting...
          </>
        ) : (
          "Start Assessment"
        )}
      </button>
    </form>
  );
}
