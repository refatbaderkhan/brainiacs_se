import React, { useState, useEffect } from "react";
import axios from "axios";

function QuizDetails({ quizId }) {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
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

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmitQuiz = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/quizzes/${quizId}/submit`,
        { answers },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setScore(response.data.score);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  if (!quiz) {
    return <p>Loading quiz details...</p>;
  }

  return (
  <div>
    <h3>Quiz Details:</h3>
    <p>Title: {quiz.title}</p>
    <p>Description: {quiz.description}</p>

    <h4>Question:</h4>
    <p>{quiz.questions[0].question_text}</p>

    <h4>Choices:</h4>
    <ul>
      <li>
        <label>
          <input
            type="radio"
            name="option"
            value="a"
            onChange={() => handleAnswerChange(quiz.questions[0].id, "a")}
          />
          {quiz.questions[0].option_a}
        </label>
      </li>
      <li>
        <label>
          <input
            type="radio"
            name="option"
            value="b"
            onChange={() => handleAnswerChange(quiz.questions[0].id, "b")}
          />
          {quiz.questions[0].option_b}
        </label>
      </li>
      <li>
        <label>
          <input
            type="radio"
            name="option"
            value="c"
            onChange={() => handleAnswerChange(quiz.questions[0].id, "c")}
          />
          {quiz.questions[0].option_c}
        </label>
      </li>
      <li>
        <label>
          <input
            type="radio"
            name="option"
            value="d"
            onChange={() => handleAnswerChange(quiz.questions[0].id, "d")}
          />
          {quiz.questions[0].option_d}
        </label>
      </li>
    </ul>

    <button onClick={handleSubmitQuiz}>Submit Quiz</button>

    {score !== null && <p>Your score: {score}</p>}
  </div>
);
}

export default QuizDetails;
