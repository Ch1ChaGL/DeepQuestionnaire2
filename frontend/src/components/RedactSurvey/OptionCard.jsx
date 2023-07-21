import React, { useState } from 'react';
import s from './OptionCard.module.css';
import { Form } from 'react-bootstrap';

function OptionCard({ option, setQuestion }) {
  const [questionTexs, setQuestionTexs] = useState(option);
  return (
    <div className={s.container}>
      <Form.Control type='text' value={questionTexs} />
    </div>
  );
}

export default OptionCard;
