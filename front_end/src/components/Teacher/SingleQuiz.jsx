import React, { useState } from "react";
import '../../styles/assignment.css';
import ExpandableTree from "./ExpandableTree";


const SingleQuizz = ({ quizz }) => {
  const [expandedQuiz, setExpandedQuiz] = useState(false);


  const toggleQuizz = (quizzId) => {
    setExpandedQuiz(prevState => ({
      ...prevState,
      [quizzId]: !prevState[quizzId]
    }));
  };
  return (
    
    <div className="assignment-expandable">
      <ExpandableTree
        title={quizz.quizz_title}
        expanded={expandedQuiz[quizz.quizz_id] || false}
        onClick={() => toggleQuizz(quizz.quizz_id)}
      >
      {expandedQuiz && (
        <div id={`${quizz.quizz_id}`} className="assignment-details">
          <p>Grade: {quizz.quizz_grade}</p>
          <p>title: {quizz.quizz_title}</p>
          <p>description: {quizz.quizz_title}</p>
          <p>Document: {quizz.quizz_doc}</p>  
        </div>
      )}
      </ExpandableTree>
      
    </div>
   
  );
};

export default SingleQuizz;