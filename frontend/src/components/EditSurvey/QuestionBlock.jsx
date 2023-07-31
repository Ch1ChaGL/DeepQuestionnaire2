import React, { useCallback, useState, useEffect } from 'react';
import s from './QuestionBlock.module.css';
import { Handle, Position } from 'reactflow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeather } from '@fortawesome/free-solid-svg-icons';

const handleStyle = {
  background: 'green',
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  bottom: -10,
  right: -3, 
};
const handleStyle2 = {
  background: 'red',
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  left: -5,
};
function QuestionBlock({ data, isConnectable }) {
  const [questions, setQuestions] = useState(data.block.questions);

  useEffect(() => {
    setQuestions(data.block.questions);
  }, [data]);

  return (
    <div className={`${s['block']} ${data.block.id === "1" ? s['start'] : ''}`}>
      <div>
        <Handle
          type='output'
          id='a'
          position='right'
          style={handleStyle}
          isConnectable={isConnectable}
        />

        {data.block.id === "1" ? (
          <></>
        ) : (
          <Handle
            type='target'
            position={Position.Left}
            id='b'
            style={handleStyle2}
            isConnectable={isConnectable}
          />
        )}

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
