import React, { useCallback, useState } from 'react';
import s from './QuestionBlock.module.css';
import { Handle, Position } from 'reactflow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeather } from '@fortawesome/free-solid-svg-icons';

function QuestionBlock({ data, isConnectable }) {

  const [questions, setQuestions] = useState(data.block.questions);

  return (
    <div className={s['block']}>
      <div>
        <div className={s.blockHeader}>
          <div className={s.icon}>
            <FontAwesomeIcon icon={faFeather} />
          </div>
          <div className={s.title}>{data.block.title}</div>
        </div>
        <div className={s.questionsContainer}>
          {questions.map(question => (
            <div className={s.question}>{question.text}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuestionBlock;
