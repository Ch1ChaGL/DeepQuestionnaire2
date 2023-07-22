import React from 'react';
import s from './RedactQuestionCard.module.css';
function RedactQuestionCard({ question, selectedBlock }) {
  // console.log('question', question);
  // console.log('selectedBlock', selectedBlock);

  return (
    <div className={s.container}>
      <div className={s.content}>{question.text}</div>
    </div>
  );
}

export default RedactQuestionCard;
