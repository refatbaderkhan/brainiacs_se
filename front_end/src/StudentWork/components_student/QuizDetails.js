// QuizDetails.js

import React, { useState, useEffect } from "react";
import axios from "axios";

function QuizDetails({ quizId }) {
  const [quiz, setQuiz] = useState(null);
  const accessToken = localStorage.getItem("token");

  useEffect(() => {
    if (quizId) {
      // Fetch quiz details
      axios
        .get(`http://127.0.0.1:8000/api/quizzes/${quizId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setQuiz(response.data.quiz);
        })
        .catch((error) => {
          console.error("Error fetching quiz details:", error);
        });
    }
  }, [accessToken, quizId]);

  if (!quiz) {
    return <p>Loading quiz details...</p>;
  }

  return (
    <div>
      <h3>Quiz Details:</h3>
      <p>Title: {quiz.title}</p>
      <p>Description: {quiz.description}</p>
      
      {/* Display questions and choices */}
      <h4>Question:</h4>
      <p>{quiz.questions[0].question_text}</p>
      
      <h4>Choices:</h4>
      <ul>
        <li>Option A: {quiz.questions[0].option_a}</li>
        <li>Option B: {quiz.questions[0].option_b}</li>
        <li>Option C: {quiz.questions[0].option_c}</li>
        <li>Option D: {quiz.questions[0].option_d}</li>
      </ul>
      
      {/* Submission form will be implemented here */}
    </div>
  );
}

export default QuizDetails;
